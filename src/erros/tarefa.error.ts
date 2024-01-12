import { BaseError } from "./base.error";

export class TarefaIDNaoEncontradaError extends BaseError {
    constructor(id: number) {
        super("TarefaIDNaoEncontradoError", 404, `Tarefa com o ID ${id} não foi encontrada`);
    }
}