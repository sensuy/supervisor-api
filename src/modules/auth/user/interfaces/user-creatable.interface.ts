import { UserInterface } from "./user.interface";

export interface UserCreatableInterface 
extends Pick<
UserInterface, 
'username' | 'email' | 'password'
>,
Partial<Pick<UserInterface, 'active'>> {}
