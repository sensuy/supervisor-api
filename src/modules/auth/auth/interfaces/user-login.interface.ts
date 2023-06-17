import { IUser } from "@shared/interfaces";

export interface IUserLogin 
extends Pick<IUser, 'email' | 'password'> {}
