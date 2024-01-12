import { Router } from "express";
import TarefaControler from "../controladores/tarefa.controlador";
import { autenticacaoMiddleware } from "../middlewares/autenticacao-middleware";

// Inicializando o router
const router = Router();

// Definindo as rotas
router.get("/v1/tarefas", autenticacaoMiddleware, TarefaControler.obterTarefas);
router.get("/v1/tarefas/:id", TarefaControler.obterTarefaPeloID);
router.post("/v1/tarefas", TarefaControler.registrarTarefa);
router.put("/v1/tarefas/:id", TarefaControler.atualizarTarefa);
router.delete("/v1/tarefas/:id", TarefaControler.removerTarefa);

export default router;