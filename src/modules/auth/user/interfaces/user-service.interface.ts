
import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user.dto"; 
import { IUser } from "@shared/interfaces";

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto>;
  validateUserLogin(email: string, password: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
}