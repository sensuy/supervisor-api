import { ApiProperty } from "@nestjs/swagger";
import { CommonEntityDto } from "@shared/dto";
import { UserInterface } from "../interfaces";
import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH
} from "../constants/user.constants";


export class UserDto
  extends CommonEntityDto
  implements Omit<UserInterface, 'password' | 'salt'>
{
  @ApiProperty({
    title: 'Username',
    description: 'The username of user.',
    minLength: USER_NAME_MIN_LENGTH,
    maxLength: USER_NAME_MAX_LENGTH,
    example: 'John Doe',
  })
  username: string;

  @ApiProperty({
    title: 'Email',
    description: 'The user\'s email.',
    minLength: USER_EMAIL_MIN_LENGTH,
    maxLength: USER_EMAIL_MAX_LENGTH,
    example: 'johndoe@test.com'
  })
  email: string;

  @ApiProperty({
    title: 'Active',
    description: 'The flag to inform if user is active or not.',
  })
  active: boolean;
}