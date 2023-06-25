import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, CreateRoleResponseDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IROLE_REPOSITORY } from './constants/role.constants';
import { IRoleRepository } from './interfaces/role-repository.interface';

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

  findAllFranchiseRoles(idfranchise: string) {
    return this.roleRepository.findAllFranchiseRoles(idfranchise);
  }

  findAllSchoolRoles(idschool: string) {
    return this.roleRepository.findAllSchoolRoles(idschool);
  }

  async update(id: string, name: string) {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    Object.assign(role, { name });

    return this.roleRepository.update(id, role);
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
