import { Injectable } from '@nestjs/common';
import { CreatePermissionDto, CreatePermissionResponseDto } from './dto/create-role.dto';

@Injectable()
export class PermissionService {

  async create(createPermissionDto: CreatePermissionDto): Promise<CreatePermissionResponseDto> {
    return {
      ...createPermissionDto,
      createdAt: new Date(),
      active: true
    }
  }
}
