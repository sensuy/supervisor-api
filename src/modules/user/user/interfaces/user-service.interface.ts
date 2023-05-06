import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user.dto";

export interface UserServiceInterface  {
  create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto>;
}