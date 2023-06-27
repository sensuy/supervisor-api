import { ICommonEntity } from "@shared/interfaces";


export interface IRole extends ICommonEntity {
  roleid: number;
  name: string;
  idfranchise?: string;
  idschool?: string;
}
  