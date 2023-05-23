import { IUser } from "./user.interface";


export interface IUserCreatable
extends Pick<
IUser, 
'username' | 'email' | 'password'
>,
Partial<Pick<IUser, 'active'>> {}
