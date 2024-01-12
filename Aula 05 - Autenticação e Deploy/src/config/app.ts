import express from "express";
import rotasUsuario from "../rotas/usuario.rotas";
import rotasTarefa from "../rotas/tarefa.rotas";
import morgan from "morgan";
import { tratamentoErrosMiddleware } from "../middlewares/tratamento-erros.middleware";

const app = express();

// Adicionando os middlewares pré-requisição
app.use(express.json());
app.use(morgan("dev"));

// Adicionando as rotas
app.use(rotasUsuario);
app.use(rotasTarefa);

// Adicionando os middlewares pós-requisição
app.use(tratamentoErrosMiddleware);

export default app;