import { Permission } from "@modules/permission/repositories/typeorm/permission.entity";
import { ICommonEntity } from "@shared/interfaces";

export interface IRole extends ICommonEntity {
  roleid: number;
  name: string;
  franchiseid?: string;
  schoolid?: string;
  permissions?: Permission[];
}
  