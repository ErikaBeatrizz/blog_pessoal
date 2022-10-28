import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity"
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'tb]-usuarios'})
export class Usuario {

    @PrimaryGeneratedColumn ()  // auto incremento que gera uma coluna de dados
    @ApiProperty()
    public id: number;

    @IsNotEmpty()  // nao pode ser vazio
    @Column({length: 255, nullable: false})
    @ApiProperty()
    public nome: string;

    @IsEmail()    // verifica se é um e-mail real
    @Column ({length: 255, nullable: false})  // campo obrigatorio
    @ApiProperty({example:'email@email.com.br'})
    public usuario: string;

    @IsNotEmpty()
    @MinLength(8) // quantidade de caractere minima pra senha
    @Column({length: 255, nullable: false})  // lenght: qtnd caractere | nullable: não pode ser vazio
    @ApiProperty()
    public senha: string;

    @Column({length: 5000})
    @ApiProperty()
    public foto: string;

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    @ApiProperty()
    postagem: Postagem[];
}