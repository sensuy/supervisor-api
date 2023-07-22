import { Test, TestingModule } from '@nestjs/testing';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionOriginEnum } from './enum/permission-type.enum';
import { CreatePermissionDto, CreatePermissionResponseDto } from './dto/create-permission.dto';
import { ListPermissionDto } from './dto/list-permission.dto';



describe('PermissionController', () => {
  let controller: PermissionController;
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [
        {
          provide: PermissionService,
          useValue: {
            create: jest.fn(),
            listPermissionByType: jest.fn(),
            findPermissionsByIds: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<PermissionController>(PermissionController);
    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a new unique permission', async () => {
    const createPermissionDto: CreatePermissionDto = {
      permissionid: 'test',
      label: 'test',
      type: PermissionOriginEnum.FRANCHISE
    }

    const createPermissionResult: CreatePermissionResponseDto = {
      permissionid: 'test',
      label: 'test',
      type: PermissionOriginEnum.FRANCHISE,
      createdAt: new Date(),
      active: true
    }

    jest.spyOn(service, 'create').mockResolvedValue(createPermissionResult);

    const result = await controller.create(createPermissionDto);

    expect(result).toEqual(createPermissionResult);
    expect(service.create).toHaveBeenCalledWith(createPermissionDto);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should be able to list all permissions of a given type', async () => {
    const listPermissions: ListPermissionDto[] = [
      {
        permissionid: 'CREATE_FRANCHISE',
        label: 'Create Franchise'
      }
    ]

    jest.spyOn(service, 'listPermissionByType').mockResolvedValue(listPermissions);

    const result = await controller.list(PermissionOriginEnum.FRANCHISE);

    expect(result).toEqual(listPermissions);
    expect(service.listPermissionByType).toHaveBeenCalledWith(PermissionOriginEnum.FRANCHISE);
    expect(service.listPermissionByType).toHaveBeenCalledTimes(1);
  });
});
