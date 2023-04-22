
# NODE-MAIL
Script para listar os e-mails do gmail utilizando o protocolo IMAP.
## Como executar

1 - Dê um git clone na sua máquina `https://github.com/jarodsim/NODE-MAIL.git`

2 - No terminal, rode o comando `yarn install` ou `npm install` para poder baixar as dependencias

3 - Crie um arquivo **.env** e coloque o e-mail na key `EMAIL` e a senha na key `PASSWORD`. Segue um exemplo:

    PASSWORD="senhaqui"
    EMAIL="seuemail@gmail.com"
4 - Rode o comando `yarn dev` ou `npm run dev` para executar o script.

### Observações
 1 - Na linha 26: `imap.search(["ALL", ["SINCE", oneHourAgo]], (err, results) =>`  estamos buscando por todos os e-mails enviados no intervalo de uma hora atrás.
 2 - Na linha 27: `const  f  =  imap.fetch(results.slice(0, 5), { bodies:  "" });` estamos listando apenas 5 e-mails.

Sinta-se a vontade para alterar a quantidade de e-mails lidos e o período.
 
