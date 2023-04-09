import { UserInterface } from "./user.interface";

export interface UserCreatableInterface 
extends Pick<
UserInterface, 
'name' | 'email' | 'password' | 'salt'
>,
Partial<Pick<UserInterface, 'active'>> {}
