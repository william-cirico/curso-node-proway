const fs = require("node:fs");
const path = require("node:path");
const { EOL } = require("node:os");

const caminhoPastaDocumentos = path.join(__dirname, "documentos");

// Verificando se a pasta existe usando callback
fs.access(caminhoPastaDocumentos, fs.constants.F_OK, (err) => {
    if (err) {
        // Pasta não existe, então vamos criá-la
        fs.mkdir(caminhoPastaDocumentos, (err) => {
            if (err) throw err;
            console.log("Pasta criada com sucesso.");
        });
    }
});

// Criando um arquivo usando callback
const textoDoArquivo = "Esse é um texto que será inserido no arquivo quando ele for criado.";
const caminhoDoNovoArquivo = path.join(caminhoPastaDocumentos, "novo-arquivo.txt");

fs.writeFile(caminhoDoNovoArquivo, textoDoArquivo, (err) => {
    if (err) throw err;
});

// Adicionando informações no arquivo usando callback
const caminhoArquivo = path.join(caminhoPastaDocumentos, "arquivo-atualizado.txt");
const textoAdicional = `${EOL}Essa é uma nova linha criada através do código.`;

fs.appendFile(caminhoArquivo, textoAdicional, (err) => {
    if (err) throw err;
});

// Lendo informações de um arquivo usando callback
fs.readFile(caminhoArquivo, "utf8", (err, data) => {
    if (err) throw err;
    console.log("Conteúdo do arquivo:", data);
});
