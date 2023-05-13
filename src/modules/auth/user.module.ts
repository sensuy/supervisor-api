import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/repositories/typeorm/user.repository';
import { IUSER_REPOSITORY, IUSER_SERVICE } from './user/constants/user-layers.constants';
import { User } from '@users/repositories/typeorm/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: IUSER_SERVICE,
      useClass: UserService
    },
    {
      provide: IUSER_REPOSITORY,
      useClass: UserRepository
    }
  ]
})
export class UserModule { }
