import { CommonEntityInterface } from "@shared/interfaces";

export interface UserInterface extends CommonEntityInterface {
  username: string;
  email: string;
  password: string;
  salt: string; 
  active: boolean;
}
