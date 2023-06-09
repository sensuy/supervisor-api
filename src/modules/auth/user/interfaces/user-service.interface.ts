
import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user.dto"; 
import { UserLoginDto } from "../dto/user-login.dto";
import { User } from "../repositories/typeorm/user.entity";

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto>;
  validateUserLogin(loginData: UserLoginDto): Promise<User>;
  findById(id: string): Promise<User>;
}