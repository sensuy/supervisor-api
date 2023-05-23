import { IUser } from "@modules/auth/user/interfaces";

export interface IUserLogin
extends Pick<
IUser, 'email' | 'password'
> {}
