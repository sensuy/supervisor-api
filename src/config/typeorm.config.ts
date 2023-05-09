import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@users/repositories/typeorm/entities/user';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
	constructor(private config: ConfigService) {}

	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			database: process.env.DATABASE_NAME,
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			entities: ['./dist/src/modules/**/**/repositories/typeorm/entities/*{.ts,.js}'],
			migrations: ['dist/src/shared/migrations/*{.ts,.js}'],
			logging: ['error', 'info'],
			synchronize: false
		};
	}
}
