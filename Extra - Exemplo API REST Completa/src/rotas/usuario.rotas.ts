import { Router } from "express";
import { gerarUsuarioControlador } from "../fabricas/usuario-controlador.fabrica";
import { validarAtualizaoUsuario, validarCriacaoUsuario } from "../middlewares/usuario.middleware";

// Inicializando o roteador
const router = Router();

// Inicializando o controlador
const usuarioControlador = gerarUsuarioControlador();

// Definindo as rotas

/**
 * @swagger
 * /v1/usuarios:
 *     get:
 *         summary: Retorna a lista de usuários
 *         tags:
 *             - Usuários
 *         responses:
 *             200:
 *                 description: Uma lista de usuários
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 $ref: '#/components/schemas/Usuario'
 *             5XX:
 *                 description: Erro inesperado
 */
router.get("/v1/usuarios", usuarioControlador.obterUsuarios);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *     get:
 *         summary: Retorna um usuário pelo ID
 *         tags:
 *             - Usuários
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: integer
 *               required: true
 *               description: ID do usuário que será retornado 
 *         responses:
 *             200:
 *                 description: O usuário
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Usuario'
 *             404:
 *                 description: Usuário com ID informado não foi encontrado
 *             5XX:
 *                 description: Erro inesperado
 */
router.get("/v1/usuarios/:id", usuarioControlador.obterUsuarioPeloId);

// Rotas com validações
/**
 * @swagger
 * /v1/usuarios:
 *     post:
 *         summary: Registra um usuário no sistema
 *         tags:
 *             - Usuários
 *         requestBody:
 *             description: Usuário que será criado
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             nome:
 *                                 type: string
 *                             email:
 *                                 type: string
 *                             senha:
 *                                 type: string
 *                         required:
 *                             - nome
 *                             - email
 *                             - senha
 *         responses:
 *             201:
 *                 description: O usuário criado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Usuario'
 *             400:
 *                 description: Dados da requisição inválidos
 *             409:
 *                 description: Já existe um usuário cadastrado com o e-mail informado
 *             5XX:
 *                 description: Erro inesperado
 */
router.post("/v1/usuarios", validarCriacaoUsuario, usuarioControlador.registrarUsuario);

// Rotas com validações
/**
 * @swagger
 * /v1/usuarios/{id}:
 *     put:
 *         summary: Atualiza os dados de um usuário no sistema
 *         tags:
 *             - Usuários
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: integer
 *               required: true
 *               description: ID do usuário que será atualizado 
 *         requestBody:
 *             description: Dados do usuário que serão atualizados
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             nome:
 *                                 type: string
 *                             email:
 *                                 type: string
 *                             senha:
 *                                 type: string
 *                         required:
 *                             - nome
 *                             - email
 *         responses:
 *             200:
 *                 description: O usuário atualizado
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Usuario'
 *             400:
 *                 description: Dados da requisição inválidos
 *             404:
 *                 description: Usuário com o ID informado não foi encontrado
 *             409:
 *                 description: Já existe um usuário utilizando esse e-mail
 *             5XX:
 *                 description: Erro inesperado
 */
router.put("/v1/usuarios/:id", validarAtualizaoUsuario, usuarioControlador.atualizarUsuario);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *     delete:
 *         summary: Remove um usuário do sistema pelo ID
 *         tags:
 *             - Usuários
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                   type: integer
 *               required: true
 *               description: ID do usuário que será removido 
 *         responses:
 *             204:
 *                 description: O usuário atualizado
 *             404:
 *                 description: Usuário com o ID informado não foi encontrado
 *             5XX:
 *                 description: Erro inesperado
 */
router.delete("/v1/usuarios/:id", usuarioControlador.removerUsuario);

export default router;