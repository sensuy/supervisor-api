import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user.dto";
import { User } from "../repositories/typeorm/entities/user";


export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}