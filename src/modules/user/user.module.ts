import { Module } from '@nestjs/common';
import { User } from './repositories/typeorm/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUSER_REPOSITORY, IUSER_SERVICE } from './constants/user-layers.constants';
import { UserService } from './user.service';
import { UserRepository } from './repositories/typeorm/user.repository';
import { UserController } from './user.controller';
import { HASH_PROVIDER } from '@shared/constants';
import { BcryptService } from '@providers/hash/services/bcrypt.service';

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
    },
    {
      provide: HASH_PROVIDER,
      useClass: BcryptService
    },
  ],

  exports: [
    {
      provide: IUSER_SERVICE,
      useClass: UserService
    },
  ]

})
export class UserModule {}
