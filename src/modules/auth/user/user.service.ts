import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { IUserRepository, IUserService } from './interfaces';
import { IUSER_REPOSITORY } from './constants/user-layers.constants';


@Injectable()
export class UserService implements IUserService {

  constructor(
    @Inject(IUSER_REPOSITORY) private readonly userRepository: IUserRepository
  ) { }
 
  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    console.log('createUserDtodfas', createUserDto);
    const userExists = await this.userRepository.findByEmail(createUserDto.email);
    
    if (userExists) {
      throw new ConflictException('Email is already registered');
    }

    const user = await this.userRepository.create(createUserDto);
    user.salt = 'salt';

    const { email, username } = await this.userRepository.save(user);

    const response:  CreateUserResponseDto = { email, username }
    return response;
  }

}
