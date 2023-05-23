import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ProviderModule } from './providers/provider.module';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    ProviderModule, 
    AuthModule
  ],
  providers: [],
})
export class AppModule { }
