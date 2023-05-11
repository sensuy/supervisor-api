import { CreateUserDto } from "../dto/create-user.dto";
import { IUser } from "./user.interface";


export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
}