import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "./tarefa.modelo";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    nome: string;

    @Column({
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        length: 255
    })
    senha: string;

    @Column({
        length: 20
    })
    telefone: string;

    @OneToMany(() => Tarefa, (tarefa) => tarefa.usuario)
    tarefas: Tarefa[];

    constructor(nome: string, email: string, senha: string, telefone: string, id?: number) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;

        if (id) {
            this.id = id;
        }
    }
}