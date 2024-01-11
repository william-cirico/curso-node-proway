import { NextFunction, Request, Response } from "express";
import { UsuarioRepositorio } from "../repositorios/usuario.repositorio";
import { CamposNaoInformadosError } from "../erros/comum.error";
import { Usuario } from "../modelos/usuario.modelo";
import bcrypt from "bcrypt";
import { UsuarioEmailJaCadastradoError, UsuarioIDNaoEncontradoError } from "../erros/usuario.error";

// Controlador é responsável por implementar a lógica das requisições
class UsuarioControlador {
    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor() {
        this.usuarioRepositorio = new UsuarioRepositorio();
    }

    obterUsuarios = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarios = await this.usuarioRepositorio.obterUsuarios();

            const usuariosSemDadosSensiveis = usuarios.map(usuario => this.removerDadosSensiveis(usuario));

            res.json(usuariosSemDadosSensiveis);
        } catch (error) {
            next(error);
        }
    }

    obterUsuarioPeloID = async (req: Request, res: Response, next: NextFunction) => {
        const id = +req.params.id;

        try {
            const usuario = await this.usuarioRepositorio.obterUsuarioPeloID(id);

            if (!usuario) {
                next (new UsuarioIDNaoEncontradoError(id));
                return;
            }

            res.json(this.removerDadosSensiveis(usuario));
        } catch (error) {
            next(error);
        }
    }

    registrarUsuario = async (req: Request, res: Response, next: NextFunction) => {
        // Validando os dados da requisição
        const camposObrigatorios = ["nome", "email", "senha", "telefone"];

        // Filtrando os campos que não foram informados
        const camposNaoInformados = camposObrigatorios.filter(campo => !req.body[campo]);

        // Caso haja campos não informados retornar o erro
        if (camposNaoInformados.length) {
            next(new CamposNaoInformadosError(camposNaoInformados));
            return;
        }

        // Obtendo os dados do request body
        const { nome, email, senha, telefone } = req.body;

        // Criando a instância do usuário
        const usuario = new Usuario(nome, email, this.criptografarSenha(senha), telefone);

        try {
            // Verificando se o e-mail já está cadastrado
            const usuarioComEmailJaCriado = await this.usuarioRepositorio.obterUsuarioPeloEmail(usuario.email);

            if (usuarioComEmailJaCriado) {
                next(new UsuarioEmailJaCadastradoError(usuario.email));
                return;
            }

            const usuarioCriado = await this.usuarioRepositorio.salvarUsuario(usuario);

            res.json(this.removerDadosSensiveis(usuarioCriado));
        } catch (error) {
            next(error);
        }
    }

    private criptografarSenha = (senha: string) => {
        return bcrypt.hashSync(senha, 10);
    }

    private removerDadosSensiveis = (usuario: Usuario) => {
        const { senha, ...usuarioSemDadosSensiveis } = usuario;
        return usuarioSemDadosSensiveis;
    }
}

export default new UsuarioControlador;