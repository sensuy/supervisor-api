
import {
  ApiProperty,
  IntersectionType,
  PickType
} from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { UserCreatableInterface } from "../interfaces";
import { USER_PASSWORD_MIN_LENGTH } from "../constants/user.constants";

export class CreateUserDto extends IntersectionType(
  PickType(UserDto, ['username', 'email']),
) implements UserCreatableInterface {

  @ApiProperty({
    title: 'Password',
    description:
      'A Strong password that must contain at least one number, one capital letter and one lowercase letter',
    minLength: USER_PASSWORD_MIN_LENGTH,
    example: 'Password123',
  })
  password: string;
}
