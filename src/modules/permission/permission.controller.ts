import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, CreatePermissionResponseDto } from './dto/create-role.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/errors';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { PermissionCreateSchema } from './schemas/create-permision.schema';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new permission'
  })
  @ApiCreatedResponse({
    description: 'The role has been successfully created',
    type: CreatePermissionResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Validation failed.',
    type: BadRequestDto
  })
  @UsePipes(new JoiValidationPipe(PermissionCreateSchema))
  async create(
    @Body() createPermissionDto: CreatePermissionDto
    ): Promise<CreatePermissionResponseDto> {
    return this.permissionService.create(createPermissionDto);
  }
}


