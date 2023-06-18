import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  typeormConfig } from './config/typeorm.config';
import { ProviderModule } from './providers/provider.module';
import { jwtConfig } from '@config/jwt.config';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [typeormConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({ 
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
     }),
    ProviderModule,
    AuthModule,
    UserModule,
    RoleModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule { }
