import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_postagens'})     // decorator que chama a tabela principal

export class Postagem {                // exportando o estilo / classe
    @PrimaryGeneratedColumn()           // primeira coluna
    id: number;

    
    @IsNotEmpty()                                   // nao pode ser nulo, tem que ter um dado 
    @Column({length: 100, nullable: false})         // qntd caractere / nullable - não pode estar vazio
    titulo: string                                  // tipo de entrada

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
       onDelete: "CASCADE" 
    })
    tema:  Tema;

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}
