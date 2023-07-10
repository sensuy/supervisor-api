import { ICommonEntity } from "@shared/interfaces";
import { PermissionOriginEnum } from "../enum/permission-type.enum";

export interface IPermission extends ICommonEntity {
  permissionid: string;
  label: string;
  type: PermissionOriginEnum;
}
  