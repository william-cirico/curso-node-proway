import { DataSource } from "typeorm";
import { Usuario } from "../modelos/usuario.modelo";
import { Tarefa } from "../modelos/tarefa.modelo";

// Configuração da conexão com o banco de dados
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Usuario, Tarefa]
});