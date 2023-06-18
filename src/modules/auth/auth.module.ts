import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { UserModule } from '@modules/user/user.module';
import { AuthController } from './auth.controller';
import { IAUTH_SERVICE } from './constants/auth.constants';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy';
import { JwtStrategy } from './jwt-strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => config,
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IAUTH_SERVICE,
      useClass: AuthService
    },
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule { }
