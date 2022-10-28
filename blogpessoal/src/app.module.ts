import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [          
    TypeOrmModule.forRoot({                 // modulo do type ORM 
    type: 'mysql',                          // tipo do banco de dados a ser utilizado
    host: 'localhost',                      // informações do banco de dados
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_blogpessoal',
    entities: [Postagem, Tema, Usuario],   // chama as tabelas principais criadas nas outras pastas
    synchronize: true,

    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}


