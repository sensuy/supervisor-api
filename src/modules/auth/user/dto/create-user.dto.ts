import {
  IntersectionType,
  OmitType,
  PickType
} from "@nestjs/swagger";
import { IUserCreatable } from "../interfaces";
import { UserDto } from "@shared/dto";

export class CreateUserDto extends IntersectionType(
  PickType(UserDto, ['username', 'email', 'password']),
) implements IUserCreatable {}


export class CreateUserResponseDto extends IntersectionType(
  OmitType(CreateUserDto, ['password']),
) {}
