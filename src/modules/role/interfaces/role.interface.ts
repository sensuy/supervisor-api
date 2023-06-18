import { ICommonEntity } from "@shared/interfaces";


export interface IRole extends ICommonEntity {
  name: string;
  idfranchise?: string;
  idschool?: string;
}
  