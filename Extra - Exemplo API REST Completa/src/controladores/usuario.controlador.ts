import { NextFunction, Request, Response } from "express";
import { Usuario } from "../modelos/usuario.modelo";
import { UsuarioServico } from "../servicos/usuario.servico";

export class UsuarioControlador {
    private readonly servico: UsuarioServico;

    constructor(servico: UsuarioServico) {
        this.servico = servico;
    }

    obterUsuarios = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarios = await this.servico.obtemTodosUsuarios();
            res.json(usuarios.map(usuario => this.filtrarDadosSensiveis(usuario)));
        } catch (error) {
            next(error);
        }
    }

    obterUsuarioPeloId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuario = await this.servico.obtemUsuarioPeloId(+req.params.id);
            res.json(this.filtrarDadosSensiveis(usuario));
        } catch (error) {
            next(error);
        }
    }

    registrarUsuario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validando os dados da requisição
            const camposObrigatorios = ["nome", "email", "senha"];
            
            // Filtrando os campos que não foram informados.
            const camposNaoInformados = camposObrigatorios.filter(campo => !req.body[campo]);

            // Caso haja campos não informados retornar o erro
            if (camposNaoInformados.length) {
                return res.status(400).json({ message: `Parâmetro(s) faltando: ${camposNaoInformados.join(", ")}` });
            }

            // Obter os dados do body da requisição
            const { nome, email, senha } = req.body;

            const usuario = new Usuario(nome, email, senha);

            const usuarioCriado = await this.servico.registraUsuario(usuario);
            res.status(201).json(this.filtrarDadosSensiveis(usuarioCriado));
        } catch (error) {
            next(error);
        }
    }

    atualizarUsuario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = +req.params.id;

            // Validando os dados da requisição
            const camposObrigatorios = ["nome", "email"];

            // Filtrando os campos que não foram informados.
            const camposNaoInformados = camposObrigatorios.filter(campo => !req.body[campo]);

            // Caso haja campos não informados retornar o erro
            if (camposNaoInformados.length) {
                return res.status(400).json({ message: `Parâmetro(s) faltando: ${camposNaoInformados.join(", ")}` });
            }

            const { nome, email, senha } = req.body;

            const usuario = new Usuario(nome, email, senha, id);

            const usuarioAtualizado = await this.servico.atualizaUsuario(usuario);

            res.json(this.filtrarDadosSensiveis(usuarioAtualizado));
        } catch (error) {
            next(error);
        }
    }

    removerUsuario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = +req.params.id;
            const usuario = await this.servico.obtemUsuarioPeloId(id);

            await this.servico.removeUsuario(usuario);

            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    private filtrarDadosSensiveis(usuario: Usuario) {
        const { senha, ...usuarioFiltrado } = usuario;
        return usuarioFiltrado;
    }
}