import { Permission } from "@modules/permission/repositories/typeorm/permission.entity";
import { Role } from "@modules/role/repositories/typeorm/role.entity";
import { ICommonEntity } from "@shared/interfaces";


export interface IPermissionRole extends ICommonEntity {
  id: number;
  permission: Permission;
  role: Role;
}