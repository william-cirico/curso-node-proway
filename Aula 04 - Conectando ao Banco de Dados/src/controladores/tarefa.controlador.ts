import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { CamposNaoInformadosError } from "../erros/comum.error";
import { UsuarioEmailJaCadastradoError, UsuarioIDNaoEncontradoError } from "../erros/usuario.error";
import { Tarefa } from "../modelos/tarefa.modelo";
import { Usuario } from "../modelos/usuario.modelo";
import { TarefaRepositorio } from "../repositorios/tarefa.repositorio";
import { TarefaIDNaoEncontradaError } from "../erros/tarefa.error";
import { UsuarioRepositorio } from "../repositorios/usuario.repositorio";

// Controlador é responsável por implementar a lógica das requisições
class TarefaControlador {
    private readonly tarefaRepositorio: TarefaRepositorio;
    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor() {
        this.tarefaRepositorio = new TarefaRepositorio();
        this.usuarioRepositorio = new UsuarioRepositorio();
    }

    obterTarefas = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tarefas = await this.tarefaRepositorio.obterTarefas();

            res.json(tarefas);
        } catch (error) {
            next(error);
        }
    }

    obterTarefaPeloID = async (req: Request, res: Response, next: NextFunction) => {
        // Obtendo o ID através dos parâmetros da URL
        const id = +req.params.id;

        try {
            const tarefa = await this.tarefaRepositorio.obterTarefaPeloID(id);

            if (!tarefa) {
                next(new TarefaIDNaoEncontradaError(id));
                return;
            }

            res.json(tarefa);
        } catch (error) {
            next(error);
        }
    }

    registrarTarefa = async (req: Request, res: Response, next: NextFunction) => {
        // Validando os dados da requisição
        const camposObrigatorios = ["nome", "descricao", "dataPrevistaConclusao", "usuarioId"];

        // Filtrando os campos que não foram informados
        const camposNaoInformados = camposObrigatorios.filter(campo => !req.body[campo]);

        // Caso haja campos não informados retornar o erro
        if (camposNaoInformados.length) {
            next(new CamposNaoInformadosError(camposNaoInformados));
            return;
        }

        // Obtendo os dados do request body
        const { nome, descricao, dataPrevistaConclusao, usuarioId } = req.body;

        try {         
            // Verificando se o usuário existe
            const usuarioExistente = await this.usuarioRepositorio.obterUsuarioPeloID(usuarioId);

            if (!usuarioExistente) {
                next(new UsuarioIDNaoEncontradoError(usuarioId));
                return;
            }

            // Criando a instância da tarefa
            const tarefa = new Tarefa(nome, descricao, dataPrevistaConclusao, usuarioExistente);

            const tarefaCriada = await this.tarefaRepositorio.salvarTarefa(tarefa);

            // Removendo usuário da tarefa
            tarefaCriada.usuario

            res.status(201).json(this.removerUsuarioTarefa(tarefaCriada));
        } catch (error) {
            next(error);
        }
    }

    atualizarTarefa = async (req: Request, res: Response, next: NextFunction) => {
        // Obtendo o ID através dos parâmetros da URL
        const id = +req.params.id;

        try {
            // Verificando se a tarefa existe
            const tarefaExistente = await this.tarefaRepositorio.obterTarefaPeloID(id);

            if (!tarefaExistente) {
                next(new TarefaIDNaoEncontradaError(id));
                return;
            }

            // Validando os dados da requisição
            const camposObrigatorios = ["nome", "descricao", "dataPrevistaConclusao"];

            // Filtrando os campos que não foram informados
            const camposNaoInformados = camposObrigatorios.filter(campo => !req.body[campo]);

            // Caso haja campos não informados retornar o erro
            if (camposNaoInformados.length) {
                next(new CamposNaoInformadosError(camposNaoInformados));
                return;
            }

            // Obtendo os dados do request body
            const { nome, descricao, dataPrevistaConclusao, dataConclusao, usuarioId } = req.body;

            // Verificando se o usuário existe
            const usuarioExistente = await this.usuarioRepositorio.obterUsuarioPeloID(usuarioId);

            if (!usuarioExistente) {
                next(new UsuarioIDNaoEncontradoError(usuarioId));
                return;
            }

            // Criando a instância da tarefa
            const tarefa = new Tarefa(nome, descricao, dataPrevistaConclusao, usuarioExistente, dataConclusao, id);

            // Atualizando a tarefa
            const tarefaAtualizada = await this.tarefaRepositorio.salvarTarefa(tarefa);

            res.json(this.removerUsuarioTarefa(tarefaAtualizada));
        } catch (error) {
            next(error);
        }
    }

    removerTarefa = async (req: Request, res: Response, next: NextFunction) => {
        const id = +req.params.id;

        try {
            // Verificando se o usuário existe
            const tarefa = await this.tarefaRepositorio.obterTarefaPeloID(id);

            // Se o usuário não existir remover ele
            if (!tarefa) {
                next(new TarefaIDNaoEncontradaError(id));
                return;
            }

            // Removendo usuário
            await this.tarefaRepositorio.removerTarefa(tarefa);

            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    private removerUsuarioTarefa = (tarefa: Tarefa) => {
        const { usuario, ...tarefaSemUsuario } = tarefa;
        return tarefaSemUsuario;
    }
}

export default new TarefaControlador;