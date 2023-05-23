import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { IUserRepository, IUserService } from './interfaces';
import { IUSER_REPOSITORY } from './constants/user-layers.constants';
import { In } from 'typeorm';
import { HASH_PROVIDER } from '@shared/constants';
import { IHashProvider } from 'src/providers/hash/interfaces/hash.interface';


@Injectable()
export class UserService implements IUserService {

  constructor(
    @Inject(IUSER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_PROVIDER) private readonly hashProvider: IHashProvider
  ) { }
 
  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const userExists = await this.userRepository.findByEmail(createUserDto.email);
    
    if (userExists) {
      throw new ConflictException('The email has already been registered');
    }

    const user = await this.userRepository.create(createUserDto);
    user.salt = await this.hashProvider.generateSalt();
    user.password = await this.hashProvider.hash(user.password, user.salt);

    const { email, username } = await this.userRepository.save(user);

    const response:  CreateUserResponseDto = { email, username }
    return response;
  }

}
