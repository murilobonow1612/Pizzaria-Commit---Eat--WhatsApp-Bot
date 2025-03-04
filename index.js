const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const tempo_ativo = Math.floor(Date.now() / 1000);

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  },
});

// Armazena o estado da conversa por número do usuário
const userState = {};

client.once("ready", () => {
  console.log("Pizzaria pronta pra atender!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Inicializa o cliente
client.initialize();

client.on("message_create", async (message) => {
  const userId = message.from;

  // 🚨 Ignorar algumas mensagens enviadas
  if (message.id.fromMe || userId.includes('@g.us') || message.timestamp < tempo_ativo) {
    console.log(`[IGNORADO]: ${message.body}`);
    return;
  }

  // Se o usuário ainda não tem um estado, define como 0 (menu inicial)
  if (!userState[userId]) {
    userState[userId] = { stage: 0, sabor: "" };
  }

  const state = userState[userId]; // Estado do usuário
  console.log(`📩 Nova mensagem de ${userId}: ${message.body}`);
  console.log(`🔍 Estado atual do usuário ${userId}: ${state.stage}`);

  switch (state.stage) {
    case 0:
      await client.sendMessage(
        userId,
        "Olá! Bem-vindo à Pizzaria Commit & Eat! 🍕\nEscolha uma opção:\n1 - Fazer pedido\n0 - Cancelar"
      );
      console.log("✅ Mensagem de saudação enviada");

      userState[userId].stage = 1; // ✅ Atualiza corretamente o estágio
      console.log(`🔄 Estado atualizado para 1 (aguardando pedido)`);
      break;

    case 1:
      if (message.body === "1") {
        await client.sendMessage(
          userId,
          "Escolha o sabor da pizza:\n1 - Calabresa\n2 - Quatro Queijos\n3 - Marguerita\n4 - Portuguesa"
        );
        userState[userId].stage = 2;
        console.log(`🔄 Estado atualizado para 2 (escolhendo sabor)`);
      } else if (message.body === "0") {
        await client.sendMessage(userId, "Pedido cancelado. Volte sempre! 🍕");
        delete userState[userId]; // Reseta o estado do usuário
        console.log(`🚮 Estado do usuário ${userId} removido (pedido cancelado)`);
      } else {
        await client.sendMessage(userId, "Opção inválida. Escolha 1 ou 0.");
        console.log(`⚠️ Entrada inválida recebida: ${message.body}`);
      }
      break;

    case 2:
      if (["1", "2", "3", "4"].includes(message.body)) {
        const sabores = {
          "1": "Calabresa",
          "2": "Quatro Queijos",
          "3": "Marguerita",
          "4": "Portuguesa",
        };
        state.sabor = sabores[message.body];

        await client.sendMessage(
          userId,
          `Ótima escolha! Você escolheu ${state.sabor} 🍕.\n\nPara realizar o pagamento, por favor, faça a transferência de R$ 60 para a chave PIX abaixo:\nChave PIX: murilobonow07@gmail.com\n\nApós o pagamento, você receberá a confirmação.`
        );

        delete userState[userId]; // Finaliza o pedido e reseta o estado
        console.log(`✅ Pedido finalizado para ${userId}, sabor: ${state.sabor}`);
      } else {
        await client.sendMessage(userId, "Sabor inválido. Escolha uma opção válida.");
        console.log(`⚠️ Entrada inválida recebida: ${message.body}`);
      }
      break;

    default:
      console.log(`🚨 Estado desconhecido para ${userId}: ${state.stage}`);
      break;
  }
});