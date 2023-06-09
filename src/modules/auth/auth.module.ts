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
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { IAUTH_SERVICE } from './auth/constants/auth.constants';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { LocalStrategy } from './auth/local-strategy';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => config,
    }),
  ],
  providers: [
    {
      provide: IUSER_SERVICE,
      useClass: UserService
    },
    {
      provide: IAUTH_SERVICE,
      useClass: AuthService
    },
    {
      provide: IUSER_REPOSITORY,
      useClass: UserRepository
    },
    {
      provide: HASH_PROVIDER,
      useClass: BcryptService
    },
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [UserController, AuthController],
})
export class AuthModule { }
