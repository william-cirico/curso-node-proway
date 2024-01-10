import { Usuario } from "../../modelos/usuario.modelo";
import { IUsuarioRepositorio } from "../../interfaces/usuario-repositorio.interface";

export class UsuarioRepositorioMemoria implements IUsuarioRepositorio {
    private readonly database: Usuario[];
    private static contador = 0;

    public constructor(database: Usuario[]) {
        this.database = database;
    }

    buscaTodos(): Promise<Usuario[]> {
        return new Promise(resolve => resolve(this.database));
    }

    buscaPeloId(id: number): Promise<Usuario | undefined> {
        return new Promise(resolve => {
            const usuario = this.database.find(usuario => usuario.id === id);

            resolve(usuario);
        });
    }

    buscaPeloEmail(email: string): Promise<Usuario | undefined> {
        return new Promise(resolve => {
            const usuario = this.database.find(usuario => usuario.email === email);
            
            resolve(usuario);
        });
    }

    insere(usuario: Usuario): Promise<Usuario> {
        return new Promise(resolve => {
            UsuarioRepositorioMemoria.contador++;
            usuario.id = UsuarioRepositorioMemoria.contador;
            this.database.push(usuario);

            resolve(usuario);
        });
    }

    atualiza(usuario: Usuario): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const index = this.database.map(usuario => usuario.id).indexOf(usuario.id);

            if (index !== -1) {
                this.database[index] = usuario;

                resolve(usuario);
            }

            reject(new Error("Não foi possível atualizar o usuário."));
        });
    }

    remove(usuario: Usuario): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.database.map(usuario => usuario.id).indexOf(usuario.id);

            if (index !== -1) {
                this.database.splice(index, 1);
                resolve();
            }

            reject(new Error("Não foi possível remover o usuário."))
        });
    }
}