import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { User } from "@modules/user/repositories/typeorm/user.entity";
import { Role } from "@modules/role/repositories/typeorm/role.entity";
import { Permission } from "@modules/permission/repositories/typeorm/permission.entity";

config();


export default new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: [User, Role, Permission],
  migrations: ['./dist/src/shared/migrations/*{.ts,.js}']
});