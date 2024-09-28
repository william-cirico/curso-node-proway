const fs = require("node:fs");
const path = require("node:path")

/*
fs.readFile:
 - Rápido: Como você lê o arquivo inteiro de uma só vez, a operação acontece de forma direta e única, o que pode ser mais rápido para arquivos grandes, especialmente se o sistema puder alocar a memória necessária sem problemas.
 - Desvantagem: O arquivo inteiro é carregado na memória de uma só vez, o que, para arquivos ainda maiores, pode resultar em consumo excessivo de memória, especialmente em servidores com muitas requisições simultâneas.
fs.createReadStream:
 - Mais lento no tempo total: Streams leem os arquivos em pedaços (chunks), o que aumenta o tempo total de leitura, mas permite começar a processar dados antes que todo o arquivo seja lido.
 - Vantagem: O uso de memória é mais eficiente, pois ele processa o arquivo parte por parte, sem carregar tudo na memória de uma só vez.
*/

console.time("readFile");

const caminhoArquivo = path.join(__dirname, "documentos", "arquivo_grande.txt");

//Lendo o arquivo inteiro de uma vez
fs.readFile(caminhoArquivo, "utf8", (err, data) => {
  if (err) throw err;
  
  console.log("Tamanho do arquivo:", data.length);
  console.timeEnd("readFile");
});

console.time("readStream");

// Criando um stream de leitura
const readStream = fs.createReadStream(caminhoArquivo, { encoding: "utf8" });

readStream.on("data", (chunk) => {
  console.log("Tamanho do chunk:", chunk.length);
});

readStream.on("end", () => {
  console.timeEnd("readStream");
});

readStream.on("error", (err) => {
  console.error("Erro ao ler o arquivo:", err);
});
