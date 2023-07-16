import { CreatePermissionDto, CreatePermissionResponseDto } from "../dto/create-role.dto";
import { Permission } from "../repositories/typeorm/permission.entity";


export interface IPermissionRepository {
  create(createPermissionDto: CreatePermissionDto): Permission;
  save(permission: Permission): Promise<Permission>;
  findOne(permissionid: string): Promise<Permission | null>;
}