import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ProviderModule } from './providers/provider.module';
import { AuthModule } from '@modules/auth/auth.module';
import { jwtConfig } from '@config/jwt.config';
import typeormMigrationConfig from '@config/typeorm-migration.config';
import { serverConfig } from '@config/server.config';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [jwtConfig],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    ProviderModule,
    AuthModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule { }
