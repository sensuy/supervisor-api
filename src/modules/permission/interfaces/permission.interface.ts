import { ICommonEntity } from "@shared/interfaces";
import { PermissionOriginEnum } from "../enum/permission-type.enum";
import { PermissionRole } from "@modules/permission-role/repositories/typeorm/permission-role.entity";

export interface IPermission extends ICommonEntity {
  permissionid: string;
  label: string;
  type: PermissionOriginEnum;
  permissionRoles?: PermissionRole[];
}
  