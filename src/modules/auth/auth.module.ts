import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth/auth.controller';
import { BcryptService } from '@providers/hash/services/bcrypt.service';
import { HASH_PROVIDER } from '@shared/constants';
import { IUSER_REPOSITORY, IUSER_SERVICE } from './user/constants/user-layers.constants';
import { User } from './user/repositories/typeorm/user.entity';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/repositories/typeorm/user.repository';
import { UserService } from './user/user.service';
import { LocalStrategy } from './auth/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { IAUTH_SERVICE } from './auth/constants/auth.constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [UserController, AuthController],
  providers: [
    LocalStrategy,
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
    },
    {
      provide: IAUTH_SERVICE,
      useClass: AuthService
    }
  ]
})
export class AuthModule { }
