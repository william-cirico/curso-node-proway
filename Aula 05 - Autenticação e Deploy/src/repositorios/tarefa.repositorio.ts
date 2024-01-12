import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Tarefa } from "../modelos/tarefa.modelo";
import { Usuario } from "../modelos/usuario.modelo";

export class TarefaRepositorio {
    private readonly repositorio: Repository<Tarefa>;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Tarefa);
    }

    obterTarefas(): Promise<Tarefa[]> {
        return this.repositorio.find();
    }

    obterTarefaPeloID(id: number): Promise<Tarefa | null> {
        return this.repositorio.findOneBy({ id });
    } 

    obterTarefasDoUsuario(usuario: Usuario): Promise<Tarefa[]> {
        return this.repositorio.find({ where: { usuario } });
    }

    salvarTarefa(tarefa: Tarefa): Promise<Tarefa> {
        return this.repositorio.save(tarefa);
    }

    async removerTarefa(tarefa: Tarefa): Promise<void> {
        await this.repositorio.delete(tarefa);
    }
}