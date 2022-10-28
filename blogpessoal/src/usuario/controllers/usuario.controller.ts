import { Controller } from "@nestjs/common";
import { Body, Get, HttpCode, Post, Put, UseGuards } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger/dist";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";

@ApiTags('Usuario')
@Controller('/usuarios')
export class UsuarioController {
    constructor (private readonly usuarioService: UsuarioService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK) 
    @ApiBearerAuth()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }


@Post('/cadastrar')
@HttpCode(HttpStatus.CREATED)
async create (@Body() usuario: Usuario): Promise<Usuario> {
    return await this.usuarioService.create(usuario);
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Put('/atualizar')
@HttpCode(HttpStatus.OK)
async update (@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);

}

}