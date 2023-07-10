import { Body, Controller, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, CreatePermissionResponseDto } from './dto/create-role.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<CreatePermissionResponseDto> {
    return this.permissionService.create(createPermissionDto);
  }
}


