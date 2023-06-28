import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { IRole } from './interfaces';
import { CreateRoleResponseDto } from './dto/create-role.dto';
import { ListRoleDto } from './dto/list-role.dto';

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
            create: jest.fn()
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
    const {updatedAt, ...roleResponse} = role;
    const responseRole: CreateRoleResponseDto = roleResponse;

    jest.spyOn(service, 'create').mockResolvedValue(roleResponse);

    const response = await controller.create(createRoleDto);

    expect(response).toEqual(responseRole);
    expect(service.create).toHaveBeenCalledWith(createRoleDto);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should be able to list all roles by franchise', async () => {
    const responseRole: ListRoleDto[] = [role];

    jest.spyOn(service, 'findAllFranchiseRoles').mockResolvedValue(responseRole);

    const response = await controller.findAllFranchiseRoles(role.franchiseid);

    expect(response).toEqual(responseRole);
    expect(service.findAllFranchiseRoles).toHaveBeenCalledWith(role.franchiseid);
    expect(service.findAllFranchiseRoles).toHaveBeenCalledTimes(1);
  });

});
