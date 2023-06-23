import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, CreateRoleResponseDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { idfranchise, roleCreateSchema } from './schemas/role-create.schema';
import { uuid } from '@shared/schemas/uuid.schema';
import { idFranchiseSchema } from './schemas/idfranchise.schema';
import { IdfranchiseDto } from './dto/idfranchise.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role'
  })
  @UsePipes(new JoiValidationPipe(roleCreateSchema))
  create(@Body() createRoleDto: CreateRoleDto): Promise<CreateRoleResponseDto> {
    return this.roleService.create(createRoleDto);
  }

  @Get('franchise/:idfranchise')
  @UsePipes(new JoiValidationPipe(idFranchiseSchema))
  findAllFranchiseRoles(
    @Param('idfranchise') idfranchise: string
  ) {
    return this.roleService.findAllFranchiseRoles(idfranchise);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
