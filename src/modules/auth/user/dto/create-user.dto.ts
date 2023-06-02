import {
  IntersectionType,
  OmitType,
  PickType
} from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { IUserCreatable } from "../interfaces";

export class CreateUserDto extends IntersectionType(
  PickType(UserDto, ['username', 'email', 'password']),
) implements IUserCreatable {
 
}


export class CreateUserResponseDto extends IntersectionType(
  OmitType(CreateUserDto, ['password']),
) {}
