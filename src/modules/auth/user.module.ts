import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/repositories/typeorm/user.repository';
import { IUSER_REPOSITORY, IUSER_SERVICE } from './user/constants/user-layers.constants';
import { User } from '@users/repositories/typeorm/user.entity';
import { HASH_PROVIDER } from '@shared/constants';
import { BcryptService } from 'src/providers/hash/services/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: IUSER_SERVICE,
      useClass: UserService
    },
    {
      provide: IUSER_REPOSITORY,
      useClass: UserRepository
    },
    {
      provide: HASH_PROVIDER,
      useClass: BcryptService
    }
  ]
})
export class UserModule { }
