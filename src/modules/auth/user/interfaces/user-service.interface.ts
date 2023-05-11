import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user.dto";


export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto>;
  // save(user: UserInterface): Promise<UserInterface>;
}