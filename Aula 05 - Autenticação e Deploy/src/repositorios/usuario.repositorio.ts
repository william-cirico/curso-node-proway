import { Repository } from "typeorm";
import { Usuario } from "../modelos/usuario.modelo";
import { AppDataSource } from "../config/database";

export class UsuarioRepositorio {
    private readonly repositorio: Repository<Usuario>;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Usuario);
    }

    obterUsuarios(): Promise<Usuario[]> {
        return this.repositorio.find();
    }

    obterUsuarioPeloID(id: number): Promise<Usuario | null> {
        return this.repositorio.findOneBy({ id });
    } 

    obterUsuarioPeloEmail(email: string): Promise<Usuario | null> {
        return this.repositorio.findOneBy({ email });
    }

    salvarUsuario(usuario: Usuario): Promise<Usuario> {
        return this.repositorio.save(usuario);
    }

    async removerUsuario(usuario: Usuario): Promise<void> {
        await this.repositorio.delete(usuario);
    }
}