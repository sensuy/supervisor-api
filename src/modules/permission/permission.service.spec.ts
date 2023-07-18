import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { IPERMISSION_REPOSITORY } from './constants/permission.constants';
import { IPermissionRepository } from './interfaces/permission-repository.interface';
import { PermissionOriginEnum } from './enum/permission-type.enum';
import { Permission } from './repositories/typeorm/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ListPermissionDto } from './dto/list-permission.dto';

describe('PermissionService', () => {
  let service: PermissionService;
  let permissionRepository: IPermissionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: IPERMISSION_REPOSITORY,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            listPermissionByType: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    permissionRepository = module.get<IPermissionRepository>(IPERMISSION_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(PermissionService.prototype.create, () => {
    const createPermissionDto: CreatePermissionDto = {
      permissionid: 'test',
      label: 'test',
      type: PermissionOriginEnum.FRANCHISE
    }

    const createPermissionResult: Permission = {
      permissionid: 'test',
      label: 'test',
      type: PermissionOriginEnum.FRANCHISE,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    }

    it('should be able to create a permission', async () => {
      jest.spyOn(permissionRepository, 'save').mockResolvedValue(createPermissionResult);

      const result = await service.create(createPermissionDto);

      const { updatedAt, ...response } = createPermissionResult;

      expect(result).toEqual(response);
      expect(permissionRepository.create).toHaveBeenCalledWith(createPermissionDto);
      expect(permissionRepository.create).toHaveBeenCalledTimes(1);
      expect(permissionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the permission already exists', async () => {
      jest.spyOn(permissionRepository, 'findOne').mockResolvedValue(createPermissionResult);

      await expect(service.create(createPermissionDto)).rejects.toThrowError('Permission already exists');
      expect(permissionRepository.findOne).toHaveBeenCalledWith(createPermissionDto.permissionid);
      expect(permissionRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });


  describe(PermissionService.prototype.listPermissionByType, () => {
    const listPermissionResult: ListPermissionDto[] = [
      {
        permissionid: 'test',
        label: 'test',
      }
    ]

    it('should be able to list all franchise active permissions of a given type', async () => {
      jest.spyOn(permissionRepository, 'listPermissionByType').mockResolvedValue(listPermissionResult);

      const result = await service.listPermissionByType(PermissionOriginEnum.FRANCHISE);

      expect(result).toEqual(listPermissionResult);
      expect(permissionRepository.listPermissionByType).toHaveBeenCalledWith(PermissionOriginEnum.FRANCHISE);
      expect(permissionRepository.listPermissionByType).toHaveBeenCalledTimes(1);
    });
  });

});
