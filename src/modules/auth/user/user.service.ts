import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { IUserRepository, IUserService } from './interfaces';
import { IUSER_REPOSITORY } from './constants/user-layers.constants';
import { HASH_PROVIDER } from '@shared/constants';
import { IHashProvider } from '@providers/hash/interfaces/hash.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './repositories/typeorm/user.entity';


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


  async validateUserLogin(loginData: UserLoginDto): Promise<User> {
    const { email, password } = loginData;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email not registrated');
    }

   const valid = this.hashProvider.verify(password, user.password, user.salt);
   
   if (!valid) {
      throw new UnauthorizedException('Email or password invalid'); 
   }

    return user; 
  }

}
