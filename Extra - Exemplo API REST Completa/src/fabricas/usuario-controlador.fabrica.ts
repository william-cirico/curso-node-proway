import { UsuarioControlador } from "../controladores/usuario.controlador";
import { UsuarioRepositorioMemoria } from "../repositorios/memoria/usuario.repositorio";
import { UsuarioServico } from "../servicos/usuario.servico";

export function gerarUsuarioControlador(): UsuarioControlador {
    const usuarioRepositorio = new UsuarioRepositorioMemoria([]);
    const usuarioServico = new UsuarioServico(usuarioRepositorio);
    const usuarioControlador = new UsuarioControlador(usuarioServico);

    return usuarioControlador;
}