import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity"
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb]-usuarios'})
export class Usuario {

    @PrimaryGeneratedColumn ()  // auto incremento que gera uma coluna de dados
    public id: number;

    @IsNotEmpty()  // nao pode ser vazio
    @Column({length: 255, nullable: false})
    public nome: string;

    @IsEmail()    // verifica se é um e-mail real
    @Column ({length: 255, nullable: false})  // campo obrigatorio
    public usuario: string;

    @IsNotEmpty()
    @MinLength(8) // quantidade de caractere minima pra senha
    @Column({length: 255, nullable: false})  // lenght: qtnd caractere | nullable: não pode ser vazio
    public senha: string;

    @Column({length: 5000})
    public foto: string;

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[];
}