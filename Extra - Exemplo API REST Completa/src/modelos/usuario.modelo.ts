export class Usuario {
    public id: number;
    public nome: string;
    public email: string;
    public senha: string;

    public constructor(nome: string, email: string, senha: string, id?: number) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;

        if (id) {
            this.id = id;
        }
    }
}