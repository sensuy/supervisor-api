import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as request from 'supertest';
import { AppModule } from "../../app.module";
import { Role } from "./repositories/typeorm/role.entity";
import { IRole, IRoleCreatable } from "./interfaces";


describe('RoleController (e2e)', () => {
  let app: INestApplication;
  let roleRepository: Repository<Role>;

  const createRole: IRoleCreatable = {
    name: 'tester',
    franchiseid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
    schoolid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
  };



  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    roleRepository = moduleFixture.get(getRepositoryToken(Role));
    await app.init();
  });

  afterAll(async () => {
    await roleRepository.clear();
    await app.close();
  });

  describe('/role (POST)', () => {

    it('Should be able to create a role', async () => {
      const response = await request(app.getHttpServer())
        .post('/role')
        .send(createRole);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        roleid: expect.any(Number),
        name: createRole.name,
        franchiseid: createRole.franchiseid,
        schoolid: createRole.schoolid,
        active: true
      });
    });

    describe('name validation', () => {
      it('Should trhow a Bad Request Exception if a role name is not a string', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            name: 123
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "name should be a type of text",
          error: "Bad Request"
        });
      });

      it('Should trhow a Bad Request Exception if role name is smaller than 3 characteres', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            name: 'a'
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "name should have a minimum length of 3",
          error: "Bad Request"
        });
      });

      it('Should trhow a Bad Request Exception if a role name is greater than 50 characteres ', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            name: 'a'.repeat(51)
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "name should have a maximum length of 50",
          error: "Bad Request"
        });
      });
    });

    describe('franchiseid validation', () => {
      it('Should trhow a Bad Request Exception if a role franchiseid is not a string', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            franchiseid: 123
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "franchiseid must be of type string",
          error: "Bad Request"
        });
      });

      it('Shoul be able to create a new role even franchiseid is null', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            franchiseid: null
          });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
          roleid: expect.any(Number),
          name: createRole.name,
          franchiseid: null,
          schoolid: createRole.schoolid,
          active: true
        });

      });

      it('Should trhow a Bad Request Exception if a role franchiseid is empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            franchiseid: ''
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "franchiseid cannot be an empty field, change to null",
          error: "Bad Request"
        });
      });

      it('Should trhow a Bad Request Exception if a role franchiseid is not a valid uuid', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            franchiseid: '123'
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "franchiseid must be a UUID",
          error: "Bad Request"
        });
      });

      it('Should trhow a Bad Request Exception if a role franchiseid is missing', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            name: createRole.name,
            schoolid: createRole.schoolid
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "franchiseid is a required field",
          error: "Bad Request"
        });
      });
    });

    describe('schoolid validation', () => {
      it('Should trhow a Bad Request Exception if a role schoolid is not a string', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            schoolid: 123
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "schoolid must be of type string",
          error: "Bad Request"
        });
      });

      it('Shoul be able to create a new role even schoolid is null', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            schoolid: null
          });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
          roleid: expect.any(Number),
          name: createRole.name,
          franchiseid: createRole.franchiseid,
          schoolid: null,
          active: true
        });

      });

      it('Should trhow a Bad Request Exception if a role schoolid is empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            schoolid: ''
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "schoolid cannot be an empty field, change to null",
          error: "Bad Request"
        });
      });

      it('Should trhow a Bad Request Exception if a role schoolid is not a valid uuid', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            ...createRole,
            schoolid: '123'
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "schoolid must be a UUID",
          error: "Bad Request"
        });
      });

      it('Should trhow a Bad Request Exception if a role schoolid is missing', async () => {
        const response = await request(app.getHttpServer())
          .post('/role')
          .send({
            name: createRole.name,
            franchiseid: createRole.franchiseid
          });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: "schoolid is a required field",
          error: "Bad Request"
        });
      });
    });
  });
});