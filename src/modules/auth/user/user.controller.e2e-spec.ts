import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@users/repositories/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UserModule } from '../user.module';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'test',
          logging: ['error', 'warn', "info"],
          entities: [User],
          synchronize: false,
        }),
      ],
    }).compile();

    userRepository = moduleFixture.get(getRepositoryToken(User));
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await userRepository.delete({ email: 'asdf@sadf.com' });
    await app.close();
  });


  describe('/user (POST)', () => {
    it('Should be able to create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({
          username: 'test',
          email: 'asdf@sadf.com',
          password: 'S123456asdf%',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('username');
    });

    it('Should trhow a errro if a user email is already registered', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({
          username: 'test',
          email: 'asdf@sadf.com',
          password: 'S123456asdf%',
        });

      expect(response.status).toBe(409);
      expect(response.body).toStrictEqual({
        error: "Conflict",
        message: "Email is already registered",
        statusCode: 409
      });
    });
  });
});


