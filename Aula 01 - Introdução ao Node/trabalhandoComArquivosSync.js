const fs = require("node:fs");
const path = require("node:path");
const { EOL } = require("node:os");

const caminhoPastaDocumentos = path.join(__dirname, "documentos");

// Verificando se a pasta existe
if (!fs.existsSync(caminhoPastaDocumentos)) {
    fs.mkdirSync(caminhoPastaDocumentos); // Criando a pasta
}

// Criando um arquivo
const textoDoArquivo = "Esse é um texto que será inserido no arquivo quando ele for criado.";
const caminhoDoNovoArquivo = path.join(caminhoPastaDocumentos, "novo-arquivo.txt");
fs.writeFileSync(caminhoDoNovoArquivo, textoDoArquivo);

// Adicionando informações no arquivo
const caminhoArquivo = path.join(caminhoPastaDocumentos, "arquivo-atualizado.txt");
const textoAdicional = `${EOL}Essa é uma nova linha criada através do código.`; // EOL serve para pular linha.
fs.appendFileSync(caminhoArquivo, textoAdicional);

// Lendo informações de um arquivo
const dadosArquivo = fs.readFileSync(caminhoArquivo, "utf8");
console.log("Conteúdo do arquivo:", dadosArquivo);