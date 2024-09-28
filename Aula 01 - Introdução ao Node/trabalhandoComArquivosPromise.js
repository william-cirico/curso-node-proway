const fs = require("node:fs").promises;
const path = require("node:path");
const { EOL } = require("node:os");

const caminhoPastaDocumentos = path.join(__dirname, "documentos");

(async () => {
    try {
        // Verificando se a pasta existe e criando se não existir
        try {
            await fs.access(caminhoPastaDocumentos);
        } catch (err) {
            // Pasta não existe, então vamos criá-la
            await fs.mkdir(caminhoPastaDocumentos);
            console.log("Pasta criada com sucesso.");
        }

        // Criando um arquivo
        const textoDoArquivo = "Esse é um texto que será inserido no arquivo quando ele for criado.";
        const caminhoDoNovoArquivo = path.join(caminhoPastaDocumentos, "novo-arquivo.txt");
        await fs.writeFile(caminhoDoNovoArquivo, textoDoArquivo);

        // Adicionando informações no arquivo
        const caminhoArquivo = path.join(caminhoPastaDocumentos, "arquivo-atualizado.txt");
        const textoAdicional = `${EOL}Essa é uma nova linha criada através do código.`;
        await fs.appendFile(caminhoArquivo, textoAdicional);

        // Lendo informações de um arquivo
        const dadosArquivo = await fs.readFile(caminhoArquivo, "utf8");
        console.log("Conteúdo do arquivo:", dadosArquivo);
    } catch (err) {
        console.error("Erro:", err);
    }
})();
