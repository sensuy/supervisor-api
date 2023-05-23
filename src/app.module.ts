import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/auth/user.module';
import { ProviderModule } from './providers/provider.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    ProviderModule,
    UserModule
  ],
  providers: [],
})
export class AppModule { }
