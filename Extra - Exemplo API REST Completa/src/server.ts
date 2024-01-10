import express from "express";
import usuarioRotas from "./rotas/usuario.rotas";
import { tratamentoErrosMiddleware } from "./middlewares/tratamento-erros.middleware";
import morgan from "morgan";
import cors from "cors";
import { createStream } from "rotating-file-stream";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import https from "node:https";
import path from "node:path";

// Criando a porta para o servidor HTTP
const PORTA = 8080;

// Criando a porta para o servidor HTTPS
const PORTA_HTTPS = process.env.PORT || 3000;

const app = express();

// Configurando middlewares pré-requisição
app.use(express.json());  // Possibilita obter o body JSON das requisições (POST e PUT).

// Configurando os logs
// Criando uma stream rotativa (https://sematext.com/glossary/log-rotation/)
const stream = createStream("access.log", {
    size: "10MB",
    interval: "1d",
    compress: "gzip"
});

// Adicionando os logs no arquivo
app.use(morgan("combined", { 
    stream,
    skip: (req, res) => {
        // URLS que serão ignorados no log de arquivos (Arquivos estáticos da documentação)
        const urlsIgnorar = [
            '/swagger-ui-bundle.js',
            '/swagger-ui-standalone-preset.js',
            '/swagger-ui-init.js',
            '/swagger-ui.css',
            '/favicon-32x32.png'
        ];

        return urlsIgnorar.some(url => req.url.startsWith(url));
    }
}));

// Adicionando os logs no terminal
app.use(morgan("dev"));

// Configurando o CORS (https://developer.mozilla.org/pt-BR/docs/Glossary/CORS)
app.use(cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*"
}));

// Adicionando as rotas da API
app.use(usuarioRotas);

// Rota para verificar a saúde da API
app.use("/health", (req, res) => {
    res.status(200).send("API está rodando");
});

// Middleware de tratamento de erros
app.use(tratamentoErrosMiddleware);

// Adicionando documentação da API com swagger
const swaggerOptions: swaggerJsDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0", // Documentação: https://swagger.io/docs/specification/about/
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "Documentação da API de tarefas"
        },
        servers: [
            {
                url: `http://localhost:${PORTA}`,
                description: "Servidor de desenvolvimento"
            },
            {
                url: `https://localhost:${PORTA}`,
                description: "Servidor HTTPS de desenvolvimento"
            },
        ],
        components: {
            schemas: {
                Usuario: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID do usuário"
                        },
                        nome: {
                            type: "string",
                            description: "Nome do usuário"
                        },
                        email: {
                            type: "string",
                            description: "E-mail do usuário"
                        }
                    }
                },
            }
        }
    },
    apis: [path.join(__dirname, "rotas", "*.ts")]
};

// Definindo as configurações da documentação
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Definindo o endpoint para acessar a documentação
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/*
Para gerar o certificado autoassinado execute os seguintes comandos no bash do git:
- openssl genrsa -out privatekey.pem 2048
- openssl req -new -x509 -key privatekey.pem -out certificate.pem -days 365

** Certificados autoassinados devem ser utilizados apenas na fase de desenvolvimento.
Quando estiver em produção é necessário emitir um certificado através de uma CA ou
gerar um gratuitamente através do Let's Encrypt: 
- https://letsencrypt.org/pt-br/
- https://certbot.eff.org/
*/

// Lendo os arquivos do certificado
const privateKey = fs.readFileSync(path.join(__dirname, "..", "certs", "privatekey.pem"));
const certificate = fs.readFileSync(path.join(__dirname, "..", "certs", "certificate.pem"));

const credentials = { key: privateKey, cert: certificate };

// Criando o servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Rodando o servidor HTTPS
httpsServer.listen(PORTA_HTTPS, () => {
    console.log(`O servidor de produção está rodando no endereço: https://localhost:${PORTA_HTTPS}`);
});

// Rodando o servidor HTTP
app.listen(PORTA, () => {
    console.log(`O servidor de desenvolvimento está rodando no endereço: http://localhost:${PORTA}`);
});