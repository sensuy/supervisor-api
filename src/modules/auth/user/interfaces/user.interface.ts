import { ICommonEntity } from "@shared/interfaces";

export interface IUser extends ICommonEntity {
  username: string;
  email: string;
  password: string;
  salt: string;
  active: boolean;
}
