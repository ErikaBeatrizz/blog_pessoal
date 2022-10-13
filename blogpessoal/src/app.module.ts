import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';


@Module({
  imports: [          
    TypeOrmModule.forRoot({                 // modulo do type ORM 
    type: 'mysql',                          // tipo do banco de dados a ser utilizado
    host: 'localhost',                      // informações do banco de dados
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_blogpessoal',
    entities: [Postagem, Tema],
    synchronize: true,

    }),
    PostagemModule,
    TemaModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


