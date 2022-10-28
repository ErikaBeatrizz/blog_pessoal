import { IsNotEmpty } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_postagens'})     // decorator que chama a tabela principal

export class Postagem {                // exportando o estilo / classe
    
    @ApiProperty()
    @PrimaryGeneratedColumn()           // primeira coluna
    id: number;

    @ApiProperty()
    @IsNotEmpty()                                   // nao pode ser nulo, tem que ter um dado 
    @Column({length: 100, nullable: false})         // qntd caractere / nullable - não pode estar vazio
    titulo: string                                  // tipo de entrada

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @ApiProperty()
    @UpdateDateColumn()
    data: Date;

    @ApiProperty({type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
       onDelete: "CASCADE" 
    })
    tema:  Tema;

    @ApiProperty({type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}
