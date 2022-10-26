import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseExceptionFilter } from '@nestjs/core';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let token: any; 
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {  //antes de cada teste que sera executado
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_blogpessoal_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true

        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    });

  afterAll(async () => {
    await app.close();

  });

  it ('01 - Deve Cadastrar Usuário', async () => {
    const resposta = await request(app.getHttpServer())  //fazer uma requisição pro servidor na var app
    .post('/usuario/cadastrar')
    .send ({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ''
    });
    expect(201)  //codigo de retorno padrao qndo faz um cadastro

    usuarioId = resposta.body.id;
  });

  it('02 - Deve Autenticar Usuário (Login)', async () => {
    const resposta = await request(app.getHttpServer())
    . post('/auth/logar')
    . send ({
      usuario: 'root@root.com',
      senha: 'rootroot'
    });
  expect(200)
  })


  it('03 - Não Deve Duplicar o Usuário', async () => {
    request(app.getHttpServer())
    .post('/usuario/cadastrar')
    .send ({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ''
    })
    expect(400);
    
  });


  it('04 - Deve listar todos os Usuários', async () => {
    request(app.getHttpServer())
    .get('/usuario/all')
    .set('Authorization', `${token}`)
    .send({})
    expect(200)
  }) 

  it('05 - Atualizar Usuário', async ()  => {
    request(app.getHttpServer())
    .put('/usuario/atualizar')
    .set('Authorization', `${token}`)
    .send ({
      id: usuarioId,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ''
    })
    .then(resposta => {
      expect('Root Atualizadov').toEqual(resposta.body.name); 
    })
    expect(200)

  })


});
