import { Router } from "express";
import UsuarioControlador from "../controladores/usuario.controlador";

// Inicializando o router
const router = Router();

// Definindo as rotas
router.get("/v1/usuarios", UsuarioControlador.obterUsuarios);
router.get("/v1/usuarios/:id", UsuarioControlador.obterUsuarioPeloID);
router.post("/v1/usuarios", UsuarioControlador.registrarUsuario);

export default router;