import { CommonEntityInterface } from "src/shared/interfaces";


export interface UserInterface extends CommonEntityInterface {
  name: string;
  email: string;
  password: string;
  salt: string; 
  active: boolean;
}
