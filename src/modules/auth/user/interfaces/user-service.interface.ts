import { UserLoginDto } from "@modules/auth/auth/dto/user-login.dto";
import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user.dto";


export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto>;
  validateUserLogin(user: UserLoginDto): Promise<boolean>;
}