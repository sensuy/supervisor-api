import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, CreateRoleResponseDto } from './dto/create-role.dto';
import { IROLE_REPOSITORY } from './constants/role.constants';
import { IRoleRepository } from './interfaces/role-repository.interface';
import { ListRoleDto } from './dto/list-role.dto';
import { UpdateRoleResponseDto } from './dto/update-role.dto';
import { RoleAssignPermissionDto } from './dto/role-assign-permission.dto';
import { PermissionService } from '@modules/permission/permission.service';

@Injectable()
export class RoleService {

  constructor(
    @Inject(IROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    private readonly permissionService: PermissionService
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<CreateRoleResponseDto> {
    const role = await this.roleRepository.create(createRoleDto);

    const roleCreated = await this.roleRepository.save(role);
    const { updatedAt, ...roleResponse } = roleCreated;

    return roleResponse;
  }

  async assignPermissions(payload: RoleAssignPermissionDto): Promise<void> {
    // return this.roleRepository.assignPermission();
    const { roleid, permissions } = payload;

    const role = await this.roleRepository.findById(roleid);
    if (!role || !role.active) {
      throw new NotFoundException('Role not found');
    }

    const permissionsFound = await this.permissionService.findPermissionsByIds(permissions);

    if (permissionsFound.length !== permissions.length) {
      // get all missing permissions
      const permissionIdsFound: string[] = permissionsFound.map(permission => permission.permissionid);
      const missingPermissions = permissions.filter(permission => !permissionIdsFound.includes(permission));
      throw new NotFoundException(`Permissions not found: ${missingPermissions}`);
    }

    role.permissions = permissionsFound;
    await this.roleRepository.save(role);
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
