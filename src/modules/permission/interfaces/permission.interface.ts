import { ICommonEntity } from "@shared/interfaces";
import { PermissionOriginEnum } from "../enum/permission-type.enum";
import { Role } from "@modules/role/repositories/typeorm/role.entity";
export interface IPermission extends ICommonEntity {
  permissionid: string;
  label: string;
  type: PermissionOriginEnum;
  roles?: Role[]
}
  