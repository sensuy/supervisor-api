import { IUser } from "@shared/interfaces";
import { CreateUserDto } from "../dto/create-user.dto";


export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
}