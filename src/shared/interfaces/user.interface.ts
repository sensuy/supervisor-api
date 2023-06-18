import { ICommonEntity } from "./common-entity.interface";


export interface IUser extends ICommonEntity {
  username: string;
  email: string;
  password: string;
  salt: string;
}
