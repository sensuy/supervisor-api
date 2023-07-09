import { ICommonEntity } from "@shared/interfaces";

export interface IPermission extends ICommonEntity {
  permissionid: string;
  label: string;
}
  