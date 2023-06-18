import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as request from 'supertest';
import { AppModule } from "../../app.module";
import { User } from "../user/repositories/typeorm/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtService } from "@nestjs/jwt";



describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let tokens: AuthResponseDto;
  let jwtService: JwtService;

  const createUser: CreateUserDto = {
    username: 'Jhon Doe',
    email: 'jhondoe@email.com',
    password: 'S123456asdf%',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    userRepository = moduleFixture.get(getRepositoryToken(User));
    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get(JwtService);
    await app.init();
  });

  afterAll(async () => {
    await userRepository.delete({ email: createUser.email });
    await app.close();
  });

  describe('/auth/login (POST)', () => {

    it('should be able to login a user and get tokens', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(createUser);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: createUser.email,
          password: createUser.password
        });

      tokens = response.body;

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should not be able to login a user with wrong password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: createUser.email,
          password: 'wrongPassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({
        statusCode: 401,
        message: 'Email or password invalid',
        error: 'Unauthorized'
      });
    });

    it('should not be able to login a user with wrong email', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrongEmail',
          password: createUser.password
        });

      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual({
        statusCode: 404,
        message: 'email was not registered',
        error: 'Not Found'
      });
    });

    it('should not be able to login a user without email', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: createUser.password
        });

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({
        statusCode: 401,
        message: "Missing credentials",
        error: "Unauthorized"
      });
    });

    it('should not be able to login a user without password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: createUser.email
        });

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({
        statusCode: 401,
        message: "Missing credentials",
        error: "Unauthorized"
      });
    });
  });

  describe('/auth/profile (GET)', () => {
    it('should be able to get user profile', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${tokens.accessToken}`);
        
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        username: createUser.username,
        email: createUser.email,
        createdAt: expect.any(String),
        active: true,
      });
    });

    it('should not be able to get user profile without token', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile');
        
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "No auth token",
        error: "Unauthorized"
      });
    });

    it('should not be able to get user profile with invalid token', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer invalidToken`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "jwt malformed",
        error: "Unauthorized"
      });
    });

    it('should not be able to get user profile with token with invalid signature', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${tokens.accessToken}invalid`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "invalid signature",
        error: "Unauthorized"
      });
    });

    it('should not be able to get user profile with a expired token', async () => {
      const expiredToken = jwtService.sign(
        { userId: 1 }, 
        {
          secret: process.env.JWT_SECRET, 
          expiresIn: '-10s' 
        });
      
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "jwt expired",
        error: "Unauthorized"
      });

    });
  });

  describe('/auth/refresh (POST)', () => {
    it('should be able to refresh access tokens', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: tokens.refreshToken
        });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        accessToken: expect.any(String)
      });
    });

    it('should not be able to refresh access tokens with invalid refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: 'invalidRefreshToken'
        });

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({
        statusCode: 401,
        message: "refresh token jwt malformed",
        error: "Unauthorized"
      });
    });

    it('should not be able to refresh access tokens with expired refresh token', async () => {
      const expiredRefreshToken = jwtService.sign(
        { userId: 1 }, 
        {
          secret: process.env.JWT_SECRET, 
          expiresIn: '-10s' 
        });
      
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken: expiredRefreshToken
        });

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({
        statusCode: 401,
        message: "refresh token jwt expired",
        error: "Unauthorized"
      });
    });
  });

});