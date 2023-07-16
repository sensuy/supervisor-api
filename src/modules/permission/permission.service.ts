import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  CreatePermissionDto,
  CreatePermissionResponseDto
} from './dto/create-role.dto';
import { IPERMISSION_REPOSITORY } from './constants/permission.constants';
import { IPermissionRepository } from './interfaces/permission-repository.interface';

@Injectable()
export class PermissionService {

  constructor(
    @Inject(IPERMISSION_REPOSITORY)
    private readonly permissionRepository: IPermissionRepository
  ) { }

  async create(createPermissionDto: CreatePermissionDto): Promise<CreatePermissionResponseDto> {

    const permission = await this.permissionRepository.findOne(createPermissionDto.permissionid);

    console.log({ permission });


    if (permission) {
      throw new ConflictException('Permission already exists');
    }

    const permissionCreated = this.permissionRepository.create(createPermissionDto);

    const permissionSaved = await this.permissionRepository.save(permissionCreated);

    const { updatedAt, ...response } = permissionSaved;

    return response;
  }
}
