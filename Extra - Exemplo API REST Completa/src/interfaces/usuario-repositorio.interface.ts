import { Usuario } from "../modelos/usuario.modelo";


export interface IUsuarioRepositorio {
    buscaTodos(): Promise<Usuario[]>;
    buscaPeloId(id: number): Promise<Usuario | undefined>;
    buscaPeloEmail(email: string): Promise<Usuario | undefined>;
    insere(usuario: Usuario): Promise<Usuario>;
    atualiza(usuario: Usuario): Promise<Usuario>;
    remove(usuario: Usuario): Promise<void>;
}