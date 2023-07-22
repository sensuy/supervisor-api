import { Role } from "@modules/role/repositories/typeorm/role.entity";
import { User } from "@modules/user/repositories/typeorm/user.entity";
import { ICommonEntity } from "@shared/interfaces";

export interface IAuth extends ICommonEntity {
  authid: number;
  franchiseid: string;
  schoolid: string;
  user: User;
  role: Role;
}