import { CreatePermissionDto } from "../dto/create-permission.dto";
import { ListPermissionDto } from "../dto/list-permission.dto";
import { PermissionOriginEnum } from "../enum/permission-type.enum";
import { Permission } from "../repositories/typeorm/permission.entity";


export interface IPermissionRepository {
  create(createPermissionDto: CreatePermissionDto): Permission;
  save(permission: Permission): Promise<Permission>;
  findOne(permissionid: string): Promise<Permission | null>;
  listPermissionByType(type: PermissionOriginEnum): Promise<ListPermissionDto[]>;
  findPermissionsByIds(permissionids: string[]): Promise<Permission[]>;
}