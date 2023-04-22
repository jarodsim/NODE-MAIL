import Imap from "imap";
import { simpleParser } from "mailparser";
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const email = process.env.EMAIL || "email@email.com";
const password = process.env.PASSWORD || "pass";

const imapConfig = {
  user: email,
  password: password,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
};

const getEmails = () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toUTCString();
  console.log("oneHourAgo", oneHourAgo);
  try {
    const imap = new Imap(imapConfig);
    imap.once("ready", () => {
      imap.openBox("INBOX", false, () => {
        // lerá todos os e-mails dentro de uma hora
        imap.search(["ALL", ["SINCE", oneHourAgo]], (err, results) => {
          const f = imap.fetch(results.slice(0, 5), { bodies: "" });
          f.on("message", (msg) => {
            msg.on("body", (stream) => {
              simpleParser(stream, async (err, parsed) => {
                const { from, subject, textAsHtml, text, headers } = parsed;
                console.log("------------INÍCIO-EMAIL------------");
                console.log("De: ", from ? from.text : "------");
                console.log(
                  "Data: ",
                  new Date(headers.get("date") as string).toLocaleString(
                    "pt-BR"
                  ) || "------"
                );
                console.log("Assunto: ", subject);
                console.log("Texto: ", text);
                console.log("Texto do HTML: ", textAsHtml);
                console.log("------------FIM-EMAIL------------");
              });
            });
            msg.once("attributes", (attrs) => {
              const { uid } = attrs;
              imap.addFlags(uid, ["\\Seen"], () => {
                console.log("marcado como lido!");
              });
            });
          });
          f.once("error", (ex) => {
            return Promise.reject(ex);
          });
          f.once("end", () => {
            console.log("Mensagens lidas!");
            imap.end();
          });
        });
      });
    });

    imap.once("error", (err: string) => {
      console.log(err);
    });

    imap.once("end", () => {
      console.log("Conexão finalizada");
    });

    imap.connect();
  } catch (ex) {
    console.log(`error: ${ex}`);
  }
};

getEmails();
