import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.modelo";

@Entity()
export class Tarefa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    nome: string;

    @Column()
    descricao: string;

    @Column({
        type: "date"
    })
    dataPrevistaConclusao: string;

    @Column({
        type: "date",
        nullable: true
    })
    dataConclusao?: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.tarefas, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuarioId" })
    usuario: Usuario;

    constructor(nome: string, descricao: string, dataPrevistaConclusao: string, usuario: Usuario, dataConclusao?: string, id?: number) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataConclusao = dataConclusao;
        this.dataPrevistaConclusao = dataPrevistaConclusao;
        this.usuario = usuario;

        if (id) {
            this.id = id;
        }
    }
}