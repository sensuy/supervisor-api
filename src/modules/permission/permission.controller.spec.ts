import { Test, TestingModule } from '@nestjs/testing';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, CreatePermissionResponseDto } from './dto/create-role.dto';
import { PermissionOriginEnum } from './enum/permission-type.enum';



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
            create: jest.fn()
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
});
