import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { IROLE_REPOSITORY } from './constants/role.constants';
import { RoleRepository } from './repositories/typeorm/role.repository';
import { Role } from './repositories/typeorm/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: IROLE_REPOSITORY,
      useClass: RoleRepository
    }
  
  ]
})
export class RoleModule {}
