import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@modules/auth/user/repositories/typeorm/user.entity';
import { TYPEORM_MODULE_CONFIG } from '@shared/constants';

// @Injectable()
// export class TypeOrmConfig implements TypeOrmOptionsFactory {
// 	constructor(private config: ConfigService) {}

// 	public createTypeOrmOptions(): TypeOrmModuleOptions {
// 		return {
// 			type: 'postgres',
// 			host: process.env.DATABASE_HOST,
// 			port: Number(process.env.DATABASE_PORT),
// 			database: process.env.DATABASE_NAME,
// 			username: process.env.DATABASE_USER,
// 			password: process.env.DATABASE_PASSWORD,
// 			entities: [User],
// 			migrations: ['dist/src/shared/migrations/*{.ts,.js}'],
// 			logging: ['error', 'warn'],
// 			synchronize: false
// 		};
// 	}
// }


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
      entities: [User],
      migrations: ['dist/src/shared/migrations/*{.ts,.js}'],
      logging: ['error', 'warn'],
      synchronize: false
    };
  }
);
