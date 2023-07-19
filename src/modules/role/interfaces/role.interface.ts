import { PermissionRole } from "@modules/permission-role/repositories/typeorm/permission-role.entity";
import { ICommonEntity } from "@shared/interfaces";

export interface IRole extends ICommonEntity {
  roleid: number;
  name: string;
  franchiseid?: string;
  schoolid?: string;
  permissionRoles?: PermissionRole[];
}
  