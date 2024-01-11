import "reflect-metadata";
import app from "./config/app";
import { AppDataSource } from "./config/database";

// Inicializando o banco de dados
AppDataSource.initialize()
    .then(async () => {
        const PORTA = 8080;

        app.listen(PORTA, () => {
            console.log(`O servidor de desenvolvimento está rodando em: http://localhost:${PORTA}`);
        });
    })
    .catch(console.error);