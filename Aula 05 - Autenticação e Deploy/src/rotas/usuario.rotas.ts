import { Router } from "express";
import UsuarioControlador from "../controladores/usuario.controlador";

// Inicializando o router
const router = Router();

// Definindo as rotas
router.get("/v1/usuarios", UsuarioControlador.obterUsuarios);
router.get("/v1/usuarios/:id", UsuarioControlador.obterUsuarioPeloID);
router.post("/v1/usuarios", UsuarioControlador.registrarUsuario);
router.post("/v1/usuarios/login", UsuarioControlador.logarUsuario);
router.put("/v1/usuarios/:id", UsuarioControlador.atualizarUsuario);
router.delete("/v1/usuarios/:id", UsuarioControlador.removerUsuario);

export default router;