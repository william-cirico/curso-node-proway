import { UsuarioEmailJaCadastradoError, UsuarioIDNaoEncontradoError } from "../error/usuario.error";
import { IUsuarioRepositorio } from "../interfaces/usuario-repositorio.interface";
import { Usuario } from "../modelos/usuario.modelo";
import bcrypt from "bcrypt";

export class UsuarioServico {
    private readonly usuarioRepositorio: IUsuarioRepositorio;

    constructor(usuarioRepositorio: IUsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    async obtemTodosUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuarioRepositorio.buscaTodos();

        return usuarios;
    }

    async obtemUsuarioPeloId(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepositorio.buscaPeloId(id);

        // Se o usuário não for encontrado retornar um erro.
        if (!usuario) {
            throw new UsuarioIDNaoEncontradoError(id);
        }

        return usuario;
    }

    async registraUsuario(usuario: Usuario): Promise<Usuario> {
        // Verificando se já existe um usuário com aquele e-mail cadastrado
        const usuarioComEmailCadastrado = await this.usuarioRepositorio.buscaPeloEmail(usuario.email);

        // Se já exister disparar um erro
        if (usuarioComEmailCadastrado) {
            throw new UsuarioEmailJaCadastradoError(usuario.email);
        }

        // Hash da senha
        usuario.senha = await this.hashSenha(usuario.senha);

        const usuarioCriado = await this.usuarioRepositorio.insere(usuario);

        return usuarioCriado;
    }

    async atualizaUsuario(usuario: Usuario): Promise<Usuario> {
        // Verificando se o usuário existe
        const usuarioExistente = await this.usuarioRepositorio.buscaPeloId(usuario.id);
        if (!usuarioExistente) {
            throw new UsuarioIDNaoEncontradoError(usuario.id);
        }

        // Verificando se o e-mail já existe e pertence a outra pessoa
        const usuarioComEmailCadastrado = await this.usuarioRepositorio.buscaPeloEmail(usuario.email);
        
        if (usuarioComEmailCadastrado && usuarioComEmailCadastrado.id !== usuario.id) {
            throw new UsuarioEmailJaCadastradoError(usuario.email);
        }

        // hash da senha
        if (usuario.senha) {
            usuario.senha = await this.hashSenha(usuario.senha);
        } else {
            usuario.senha = usuarioExistente.senha;
        }

        const usuarioAtualizado = await this.usuarioRepositorio.atualiza(usuario);

        return usuarioAtualizado;
    }

    async removeUsuario(usuario: Usuario): Promise<void> {
        // Verificando se o usuário existe
        const usuarioExistente = await this.usuarioRepositorio.buscaPeloId(usuario.id);
        if (!usuarioExistente) {
            throw new UsuarioIDNaoEncontradoError(usuario.id);
        }

        return await this.usuarioRepositorio.remove(usuario);
    }

    private hashSenha(senha: string): Promise<string> {
        return bcrypt.hash(senha, 10);
    }
}