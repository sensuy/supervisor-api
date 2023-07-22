import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { IRole } from './interfaces';
import { CreateRoleResponseDto } from './dto/create-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { UpdateRoleResponseDto } from './dto/update-role.dto';
import { RoleAssignPermissionDto } from './dto/role-assign-permission.dto';

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

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
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            create: jest.fn(),
            findAllFranchiseRoles: jest.fn(),
            findAllSchoolRoles: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            assignPermissions: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a role', async () => {
    const createRoleDto = {
      name: 'test',
      franchiseid: 'asdfasdfasdf',
      schoolid: 'asdfasdfasd'
    }
    const { updatedAt, ...roleResponse } = role;
    const responseRole: CreateRoleResponseDto = roleResponse;

    jest.spyOn(service, 'create').mockResolvedValue(roleResponse);

    const response = await controller.create(createRoleDto);

    expect(response).toEqual(responseRole);
    expect(service.create).toHaveBeenCalledWith(createRoleDto);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should be able to assign permissions to a role', async () => {
    const payload: RoleAssignPermissionDto = {
      roleid: 1,
      permissions: ['FRANCHISE_READ', 'FRANCHISE_WRITE']
    }

    jest.spyOn(service, 'assignPermissions').mockResolvedValue('Permissions assigned');

    const response = await controller.assignPermissions(payload);

    expect(response).toBe('Permissions assigned');
    expect(service.assignPermissions).toHaveBeenCalledWith(payload);
    expect(service.assignPermissions).toHaveBeenCalledTimes(1);

  });

  it('should be able to list all roles by franchise', async () => {
    const responseRole: ListRoleDto[] = [{ roleid: 1, name: 'test' }];

    jest.spyOn(service, 'findAllFranchiseRoles').mockResolvedValue(responseRole);

    const response = await controller.findAllFranchiseRoles(role.franchiseid);

    expect(response).toEqual(responseRole);
    expect(service.findAllFranchiseRoles).toHaveBeenCalledWith(role.franchiseid);
    expect(service.findAllFranchiseRoles).toHaveBeenCalledTimes(1);
  });

  it('should be able to list all roles by school', async () => {
    const responseRole: ListRoleDto[] = [{ roleid: 1, name: 'test' }];

    jest.spyOn(service, 'findAllSchoolRoles').mockResolvedValue(responseRole);

    const response = await controller.findAllSchoolRoles(role.schoolid);

    expect(response).toEqual(responseRole);
    expect(service.findAllSchoolRoles).toHaveBeenCalledWith(role.schoolid);
    expect(service.findAllSchoolRoles).toHaveBeenCalledTimes(1);
  });

  it('should be able to update a role', async () => {
    const updateRoleDto = {
      name: 'test'
    }
    const { createdAt, ...roleResponse } = role;
    const responseRole: UpdateRoleResponseDto = roleResponse;

    jest.spyOn(service, 'update').mockResolvedValue(roleResponse);

    const response = await controller.update(role.roleid.toString(), updateRoleDto);

    expect(response).toEqual(responseRole);
    expect(service.update).toHaveBeenCalledWith(role.roleid, updateRoleDto.name);
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it('should be able to remove a role', async () => {
    const { createdAt, ...roleResponse } = role;
    const responseRole: UpdateRoleResponseDto = roleResponse;

    jest.spyOn(service, 'remove').mockResolvedValue(responseRole);

    const response = await controller.remove(role.roleid.toString());

    expect(response).toEqual(responseRole);
    expect(service.remove).toHaveBeenCalledWith(role.roleid);
    expect(service.remove).toHaveBeenCalledTimes(1);
  });

});
