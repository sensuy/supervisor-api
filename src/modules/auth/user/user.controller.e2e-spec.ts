import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModule } from '../user.module';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './repositories/typeorm/user.entity';
import { HASH_PROVIDER } from '@shared/constants';
import { BcryptService } from '@providers/hash/services/bcrypt.service';
import { ProviderModule } from '@providers/provider.module';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;


  const createUser: CreateUserDto = {
    username: 'Jhon Doe',
    email: 'jhondoe@email.com',
    password: 'S123456asdf%',
  };

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
        
      ]
    }).compile();

    userRepository = moduleFixture.get(getRepositoryToken(User));
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await userRepository.delete({ email: createUser.email });
    await app.close();
  });

  describe('/user (POST)', () => {
    it('Should be able to create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUser);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        username: createUser.username,
        email: createUser.email
      });
    });

    describe('username validation', () => {
      it('Should trhow a Bad Request Exception if a user username is not a string', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            username: 123
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "username must be a string",
          statusCode: 400
        });
      });
      it('Should trhow a Bad Request Exception if a user username is not informed', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            username: undefined
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "username is a required field",
          statusCode: 400
        });
      });
      it('Should trhow a Bad Request Exception if a user username is less than 3 characters', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            username: 'ab'
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "username cannot be less than 3 characters",
          statusCode: 400
        });
      });
      it('Should trhow a Bad Request Exception if a user username is more than 20 characters', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            username: 'j'.repeat(51)
          });
          
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "username cannot be more than 50 characters",
          statusCode: 400
        });
      });
    });

    describe('email validation', () => {
      it('Should trhow a Conflict Exception if a user email is already registered', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send(createUser);

        expect(response.status).toBe(HttpStatus.CONFLICT);
        expect(response.body).toStrictEqual({
          error: "Conflict",
          message: "The email has already been registered",
          statusCode: 409
        });
      });
      it('Should trhow a Bad Request Exception if a user email is not a string', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            email: 123
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "email must be a string",
          statusCode: 400
        });
      });
      it('Should trhow a Bad Request Exception if a user email is empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            email: ''
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "email cannot be an empty field",
          statusCode: 400
        });
      });
      it('Should trhow a Bad Request Exception if a user email is invalid', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            email: 'invalid-email'
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "email must be a valid email address",
          statusCode: 400
        });
      });

      it('Should trhow a Bad Request Exception if a user email is not informed', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            email: undefined
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "email is a required field",
          statusCode: 400
        });
      });
      
    });

    describe('password validation', () => {
      it('Should trhow a Bad Request Exception if a user password is not a string', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            password: 123
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "password must be a string",
          statusCode: 400
        });
      });
      it('Should trhow a Bad Request Exception if a user password is empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            password: ''
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "password cannot be an empty field",
          statusCode: 400
        });
      });

      it('Should trhow a Bad Request Exception if a user password is not informed', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            password: undefined
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "password is a required field",
          statusCode: 400
        });
      });

      it('Should trhow a Bad Request Exception if a user password is less than 6 characters', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...createUser,
            password: 'a'.repeat(5)
          });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
          error: "Bad Request",
          message: "password must be at least 8 characters",
          statusCode: 400
        });
      });
    });

  });
});


