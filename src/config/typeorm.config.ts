
import { Role } from '@modules/role/repositories/typeorm/role.entity';
import { User } from '@modules/user/repositories/typeorm/user.entity';
import { registerAs } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM_MODULE_CONFIG } from '@shared/constants';


export const typeormConfig = registerAs(
  TYPEORM_MODULE_CONFIG,
  (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: [User, Role],
      migrations: ['dist/src/shared/migrations/*{.ts,.js}'],
      logging: ['error', 'warn'],
      synchronize: false
    };
  }
);
