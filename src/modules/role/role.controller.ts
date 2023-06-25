import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, CreateRoleResponseDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { roleCreateSchema } from './schemas/role-create.schema';
import { idfranchiseSchema } from './schemas/idfranchise.schema';
import { idschoolSchema } from './schemas/idschool.schema';

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
  @ApiOperation({
    summary: 'List all roles by franchise'
  })
  @UsePipes(new JoiValidationPipe(idfranchiseSchema))
  findAllFranchiseRoles(
    @Param('idfranchise') idfranchise: string
  ) {
    return this.roleService.findAllFranchiseRoles(idfranchise);
  }

  @Get('school/:idschool')
  @ApiOperation({
    summary: 'List all roles by school'
  })
  @UsePipes(new JoiValidationPipe(idschoolSchema))
  findAllSchoolRoles(
    @Param('idschool') idschool: string
  ) {
    return this.roleService.findAllSchoolRoles(idschool);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a role name'
  })
  update(@Param('id') id: string, @Body() payload: UpdateRoleDto) {
    return this.roleService.update(id, payload.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
