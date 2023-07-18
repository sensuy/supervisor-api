import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as request from 'supertest';
import { AppModule } from "../../app.module";
import { Permission } from "./repositories/typeorm/permission.entity";
import { PermissionOriginEnum } from "./enum/permission-type.enum";
import { CreatePermissionDto, CreatePermissionResponseDto } from "./dto/create-permission.dto";


describe('PermissionController (e2e)', () => {
  let app: INestApplication;
  let permissionRepository: Repository<Permission>;

  const createPermissionDto: CreatePermissionDto = {
    permissionid: 'CREATE_FRANCHISE',
    label: 'Create franchise',
    type: PermissionOriginEnum.FRANCHISE
  }

  let createdPermissionDto: CreatePermissionResponseDto;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    permissionRepository = moduleFixture.get(getRepositoryToken(Permission));
    await app.init();
  });

  afterAll(async () => {
    await permissionRepository.clear();
    await app.close();
  });

  describe('/permission (POST)', () => {
    it('should be able to create a permission', async () => {
      const response = await request(app.getHttpServer())
        .post('/permission')
        .send(createPermissionDto);

      createdPermissionDto = response.body;

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        permissionid: createPermissionDto.permissionid,
        label: createPermissionDto.label,
        type: createPermissionDto.type,
        createdAt: createdPermissionDto.createdAt,
        active: true
      });
    })

    it('should not be able to create a permission with an existing permissionid', async () => {
      const response = await request(app.getHttpServer())
        .post('/permission')
        .send(createPermissionDto);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        statusCode: 409,
        message: 'Permission already exists',
        error: 'Conflict'
      });
    });

    describe('permissionid validation', () => {
      it('should not be able to validate an empty permissionid', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            permissionid: ''
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'permissionid cannot be an empty field',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate a missing permissionid', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            permissionid: undefined
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'permissionid is a required field',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate if permission its not a text', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            permissionid: 123
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'permissionid should be a type of text',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate if permission has some lowercase letter', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            permissionid: 'create_franchise'
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'permissionid should only contain uppercase letters and underlines',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate if permission has some space', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            permissionid: 'CREATE FRANCHISE'
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'permissionid should only contain uppercase letters and underlines',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate a permissionid with less than 5 characters', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            permissionid: 'CR'
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'permissionid cannot be shorter than 5 characters',
          error: 'Bad Request'
        });
      })

      it('should not be able to validate a permissionid with more than 100 characters', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            permissionid: 'C'.repeat(101)
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'permissionid cannot be longer than 100 characters',
          error: 'Bad Request'
        });
      });


    })

    describe('label validation', () => {
      it('should not be able to validate an empty label', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            label: ''
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'label cannot be an empty field',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate a missing label', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            label: undefined
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'label is a required field',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate if label its not a text', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            label: 123
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'label should be a type of text',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate a label with less than 5 characters', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            label: 'CR'
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'label cannot be shorter than 5 characters',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate a label with more than 100 characters', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            label: 'C'.repeat(101)
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'label cannot be longer than 100 characters',
          error: 'Bad Request'
        });
      });

    });

    describe('type validation', () => {
      it('should not be able to validate an empty type', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            type: ''
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'type should be one of the following values: [FRANCHISE, SCHOOL]',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate a missing type', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            type: undefined
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'type is a required field',
          error: 'Bad Request'
        });
      });

      it('should not be able to validate a type that is not a valid PermissionOriginEnum', async () => {
        const response = await request(app.getHttpServer())
          .post('/permission')
          .send({
            ...createPermissionDto,
            type: 'INVALID'
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'type should be one of the following values: [FRANCHISE, SCHOOL]',
          error: 'Bad Request'
        });
      });
    });
  });

  describe('/permission/:type (GET)', () => {});
});