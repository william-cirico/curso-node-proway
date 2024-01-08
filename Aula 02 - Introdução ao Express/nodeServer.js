const http = require("node:http");

// Criando o servidor
const servidor = http.createServer((req, resp) => {
    const autor = "William";

    // Configurando as rotas
    if (req.url === "/") {
        resp.end(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Servidor em Node</title>
            </head>
            <body>
                <h1>Servidor Básico em Node</h1>
                <p>Criado por: ${autor}</p>
            </body>
            </html>
        `);
    } else if (req.url === "/teste") {
        resp.end(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Servidor em Node</title>
            </head>
            <body>
                <h1>Rota de teste</h1>
                <p>Criado por: ${autor}</p>
            </body>
            </html>
        `)
    }
});

// Definindo a porta em que o servidor irá rodar
const PORT = 8080;

// Inicializando o servidor
servidor.listen(PORT, () => {
    console.log("Servidor Node rodando na porta: ", PORT);
});