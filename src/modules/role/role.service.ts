import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, CreateRoleResponseDto } from './dto/create-role.dto';
import { IROLE_REPOSITORY } from './constants/role.constants';
import { IRoleRepository } from './interfaces/role-repository.interface';
import { ListRoleDto } from './dto/list-role.dto';
import { UpdateRoleResponseDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {

  constructor(
    @Inject(IROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<CreateRoleResponseDto> {

    const role = await this.roleRepository.create(createRoleDto);

    const roleCreated = await this.roleRepository.save(role);
    const { updatedAt, ...roleResponse } = roleCreated;

    return roleResponse;
  }

  findAllFranchiseRoles(idfranchise: string): Promise<ListRoleDto[]> {
    return this.roleRepository.findAllFranchiseRoles(idfranchise);
  }

  findAllSchoolRoles(idschool: string): Promise<ListRoleDto[]> {
    return this.roleRepository.findAllSchoolRoles(idschool);
  }

  async update(roleid: number, name: string): Promise<UpdateRoleResponseDto> {
    const role = await this.roleRepository.findById(roleid);
    if (!role || !role.active) {
      throw new NotFoundException('Role not found');
    }

    Object.assign(role, { name });

    const roleUpdated = await this.roleRepository.update(roleid, role);

    const { createdAt, ...roleResponse } = roleUpdated;

    return roleResponse;
  }

  async remove(roleid: number): Promise<UpdateRoleResponseDto> {
    const role = await this.roleRepository.findById(roleid);
    
    if (!role || !role.active) {
      throw new NotFoundException('Role not found');
    }

    Object.assign(role, { active: false });

    const roleUpdated = await this.roleRepository.update(roleid, role);

    const { createdAt, ...roleResponse } = roleUpdated;

    return roleResponse
  }
}
