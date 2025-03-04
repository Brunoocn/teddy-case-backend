import { INestApplication } from '@nestjs/common';

import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from 'src/app.module';

import { Repository } from 'typeorm';
import { User } from '../types/user';

describe('Authenticate (E2E)', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('[POST] /login', async () => {
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'brunotested@gmail.com',
    };

    await repository.save(user);
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      user: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      }),
    });
  });

  //   it('[POST] /register', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/auth/register')
  //       .send({
  //         name: 'John Doe',
  //         email: 'jhondoe1@gmail.com',
  //         password: '123456',
  //       });

  //     const userInDatabase = await prisma.user.findUnique({
  //       where: {
  //         email: 'jhondoe1@gmail.com',
  //       },
  //     });

  //     expect(userInDatabase).toBeTruthy();
  //     expect(response.statusCode).toBe(201);
  //     expect(response.body).toEqual(
  //       expect.objectContaining({
  //         email: 'jhondoe1@gmail.com',
  //       }),
  //     );
  //   });
});
