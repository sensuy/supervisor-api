import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UserServiceInterface } from './interfaces';

@Injectable()
export class UserService implements UserServiceInterface {
  create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return Promise.resolve({} as any);
  }

}
