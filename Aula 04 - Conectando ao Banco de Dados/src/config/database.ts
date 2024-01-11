import { DataSource } from "typeorm";
import { Usuario } from "../modelos/usuario.modelo";

// Configuração da conexão com o banco de dados
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "1234",
    database: "tarefas_db",
    synchronize: true,
    logging: false,
    entities: [Usuario]
});