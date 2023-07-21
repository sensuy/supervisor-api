import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IPERMISSION_REPOSITORY } from './constants/permission.constants';
import { IPermissionRepository } from './interfaces/permission-repository.interface';
import { CreatePermissionDto, CreatePermissionResponseDto } from './dto/create-permission.dto';
import { ListPermissionDto } from './dto/list-permission.dto';
import { PermissionOriginEnum } from './enum/permission-type.enum';
import { Permission } from './repositories/typeorm/permission.entity';

@Injectable()
export class PermissionService {

  constructor(
    @Inject(IPERMISSION_REPOSITORY)
    private readonly permissionRepository: IPermissionRepository
  ) { }

  async create(createPermissionDto: CreatePermissionDto): Promise<CreatePermissionResponseDto> {

    const permission = await this.permissionRepository.findOne(createPermissionDto.permissionid);

    if (permission) {
      throw new ConflictException('Permission already exists');
    }

    const permissionCreated = this.permissionRepository.create(createPermissionDto);

    const permissionSaved = await this.permissionRepository.save(permissionCreated);

    const { updatedAt, ...response } = permissionSaved;

    return response;
  }

  async listPermissionByType(type: PermissionOriginEnum): Promise<ListPermissionDto[]> {
    return this.permissionRepository.listPermissionByType(type);
  }

  async findPermissionsByIds(permissionids: string[]): Promise<Permission[]> {
    return this.permissionRepository.findPermissionsByIds(permissionids);
  }
}
