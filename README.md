# wwebjs-bot
Este projeto é um chatbot desenvolvido para automatizar o atendimento de pedidos em uma pizzaria via WhatsApp. Usando a biblioteca whatsapp-web.js e o poder do Node.js, o bot interage com os clientes, oferecendo uma experiência de pedidos de pizza através de mensagens no WhatsApp. Ele permite que os usuários escolham entre diferentes sabores de pizza, recebam o cardápio e finalizem seus pedidos de forma simples e eficiente. Funcionalidades      Atendimento automatizado: O bot envia uma saudação e oferece um menu com opções de pedido.
 
Escolha de sabores de pizza: 
O cliente pode escolher entre várias opções de sabores, como Calabresa, Quatro Queijos, Marguerita, entre outros.

Ignora mensagens de grupos e do próprio bot: 
O bot ignora mensagens enviadas por outros grupos e por ele mesmo, garantindo uma experiência sem interrupções.

Envio de informações de pagamento: O bot envia informações de PIX para o pagamento dos pedidos.  

Tecnologias
1- Node.js: Ambiente de execução para JavaScript no servidor;
2- whatsapp-web.js: Biblioteca para automação de WhatsApp Web;
3- Puppeteer: Usado para controle do navegador, necessário para interação com o WhatsApp Web;
4- QRCode-terminal: Para gerar e exibir o código QR para autenticação no WhatsApp Web.

Como usar
Instale as dependências:  npm install
Execute o bot: 
1- npm start
2- Escaneie o QR code: Ao rodar o bot pela primeira vez, ele exibirá um QR code no terminal. Escaneie esse código com o WhatsApp no seu celular para autenticar o bot.
3- Interaja com o bot: Após a autenticação, o bot estará pronto para atender. Basta enviar uma mensagem no WhatsApp para iniciar o atendimento.
Como funciona: 
Quando o usuário envia a primeira mensagem, o bot responde com um menu e opções para fazer o pedido ou cancelar. O usuário escolhe um sabor de pizza, e o bot coleta a escolha, respondendo com a pizza selecionada. Em seguida, o bot envia as instruções para o pagamento via PIX, esperando a confirmação do pagamento para concluir o pedido. Sinta-se à vontade para contribuir com melhorias! Caso queira adicionar novos recursos ou corrigir bugs, basta abrir um pull request. Este projeto está licenciado sob a MIT License.
