import { CommonEntityDto } from "@shared/dto";




export class UserDto extends CommonEntityDto {
  name: string;
  email: string;
  password: string;
  salt: string;
  active: boolean;
}