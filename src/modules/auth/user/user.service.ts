import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { IUserRepository, IUserService } from './interfaces';
import { IUSER_REPOSITORY } from './constants/user-layers.constants';
import { HASH_PROVIDER } from '@shared/constants';
import { IHashProvider } from '@providers/hash/interfaces/hash.interface';
import { use } from 'passport';
import { Not } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { UserLoginDto } from '../auth/dto/user-login.dto';


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

    const response: CreateUserResponseDto = { email, username }
    return response;
  }


  async validateUserLogin(user: UserLoginDto): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.hashProvider.verify(password, user.password, user.salt);
  }

}
