import { IntersectionType, PickType } from "@nestjs/swagger";
import { IUserLogin } from "../interfaces/user-login.interface";
import { CreateUserDto } from "@modules/auth/user/dto/create-user.dto";


export class UserLoginDto extends IntersectionType(
  PickType(CreateUserDto, ['email', 'password'])
) implements IUserLogin {}

