import { IntersectionType, PickType } from "@nestjs/swagger";
import { IUserLogin } from "../interfaces/user-login.interface";
import { UserDto } from "@shared/dto";

export class UserLoginDto extends IntersectionType(
  PickType(UserDto, ['email', 'password'])
) implements IUserLogin {}

