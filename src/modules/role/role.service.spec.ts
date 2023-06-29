import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { IROLE_REPOSITORY } from './constants/role.constants';
import { IRole, IRoleRepository } from './interfaces';
import { CreateRoleDto } from './dto/create-role.dto';
import { Not } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('RoleService', () => {
  let service: RoleService;
  let roleRepository: IRoleRepository;

  const role: IRole = {
    roleid: 1,
    name: 'test',
    franchiseid: 'franchise-test',
    schoolid: 'schoolid-test',
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: IROLE_REPOSITORY,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAllFranchiseRoles: jest.fn(),
            findAllSchoolRoles: jest.fn(),
            findById: jest.fn(),
            update: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    roleRepository = module.get<IRoleRepository>(IROLE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(RoleService.prototype.create, () => {
    it('Should be able to create a role', async () => {
      const payload: CreateRoleDto = {
        name: 'test',
        franchiseid: 'franchise-test',
        schoolid: 'schoolid-test'
      }
      jest.spyOn(roleRepository, 'create').mockResolvedValue(role);
      jest.spyOn(roleRepository, 'save').mockResolvedValue(role);

      const result = await service.create(payload);

      const { updatedAt, ...roleResponse } = role;

      expect(result).toEqual(roleResponse);
      expect(roleRepository.create).toHaveBeenCalledWith(payload);
      expect(roleRepository.create).toHaveBeenCalledTimes(1);
      expect(roleRepository.save).toHaveBeenCalledWith(role);
      expect(roleRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe(RoleService.prototype.findAllFranchiseRoles, () => {
    it('Should be able to find all franchise roles', async () => {
      jest.spyOn(roleRepository, 'findAllFranchiseRoles').mockResolvedValue([{ roleid: 1, name: 'test' }]);

      const result = await service.findAllFranchiseRoles('franchise-test');

      expect(result).toEqual([{ roleid: 1, name: 'test' }]);
      expect(roleRepository.findAllFranchiseRoles).toHaveBeenCalledWith('franchise-test');
      expect(roleRepository.findAllFranchiseRoles).toHaveBeenCalledTimes(1);
    });
  });

  describe(RoleService.prototype.findAllSchoolRoles, () => {
    it('Should be able to find all school roles', async () => {
      jest.spyOn(roleRepository, 'findAllSchoolRoles').mockResolvedValue([{ roleid: 1, name: 'test' }]);

      const result = await service.findAllSchoolRoles('school-test');

      expect(result).toEqual([{ roleid: 1, name: 'test' }]);
      expect(roleRepository.findAllSchoolRoles).toHaveBeenCalledWith('school-test');
      expect(roleRepository.findAllSchoolRoles).toHaveBeenCalledTimes(1);
    });
  });

  describe(RoleService.prototype.update, () => {
    it('Should be able to update a role', async () => {
      jest.spyOn(roleRepository, 'findById').mockResolvedValue(role);
      jest.spyOn(roleRepository, 'update').mockResolvedValue(role);

      const result = await service.update(1, 'test');

      const { createdAt, ...roleResponse } = role;

      expect(result).toEqual(roleResponse);
      expect(roleRepository.findById).toHaveBeenCalledWith(1);
      expect(roleRepository.findById).toHaveBeenCalledTimes(1);
      expect(roleRepository.update).toHaveBeenCalledWith(1, role);
      expect(roleRepository.update).toHaveBeenCalledTimes(1);
    });
    
    it('Should throw an error if role does not exist', async () => {
      jest.spyOn(roleRepository, 'findById').mockResolvedValue(null);

      await expect(service.update(1, 'test')).rejects.toThrow(new NotFoundException('Role not found'));
      expect(roleRepository.findById).toHaveBeenCalledWith(1);
      expect(roleRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe(RoleService.prototype.remove, () => {
    it('Should be able to remove a role', async () => {
      jest.spyOn(roleRepository, 'findById').mockResolvedValue(role);
      jest.spyOn(roleRepository, 'update').mockResolvedValue(role);

      const result = await service.remove(1);

      const { createdAt, ...roleResponse } = role;

      expect(result).toEqual(roleResponse);
      expect(roleRepository.findById).toHaveBeenCalledWith(1);
      expect(roleRepository.findById).toHaveBeenCalledTimes(1);
      expect(roleRepository.update).toHaveBeenCalledWith(1, { ...role, active: false });
      expect(roleRepository.update).toHaveBeenCalledTimes(1);
    });
    
    it('Should throw an error if role does not exist', async () => {
      jest.spyOn(roleRepository, 'findById').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(new NotFoundException('Role not found'));
      expect(roleRepository.findById).toHaveBeenCalledWith(1);
      expect(roleRepository.findById).toHaveBeenCalledTimes(1);
    });
  });
});
