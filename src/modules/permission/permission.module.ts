import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './repositories/typeorm/permission.repository';
import { IPERMISSION_REPOSITORY } from './constants/permission.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './repositories/typeorm/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    {
      provide: IPERMISSION_REPOSITORY,
      useClass: PermissionRepository
    }
  ],
  exports: [
    PermissionService
  ]
})
export class PermissionModule {}
