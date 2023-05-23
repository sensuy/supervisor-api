import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/repositories/typeorm/user.repository';
import { IUSER_REPOSITORY, IUSER_SERVICE } from './user/constants/user-layers.constants';
import { HASH_PROVIDER } from '@shared/constants';
import { BcryptService } from '@providers/hash/services/bcrypt.service';
import { User } from './user/repositories/typeorm/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
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
export class AuthModule { }
