import { IUser } from "./user.interface";


export interface UserCreatableInterface 
extends Pick<
IUser, 
'username' | 'email' | 'password'
>,
Partial<Pick<IUser, 'active'>> {}
