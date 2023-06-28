import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, CreateRoleResponseDto } from './dto/create-role.dto';
import { UpdateRoleDto, UpdateRoleResponseDto } from './dto/update-role.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { roleCreateSchema } from './schemas/role-create.schema';
import { nameSchema } from './schemas/name.schema';
import { franchiseIdSchema } from './schemas/franchiseid.schema';
import { schoolIdSchema } from './schemas/schoolid.schema';
import { roleIdSchema } from './schemas/roleid.schema';
import { ListRoleDto } from './dto/list-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

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
  @UsePipes(new JoiValidationPipe(franchiseIdSchema))
  findAllFranchiseRoles(
    @Param('idfranchise') idfranchise: string
  ): Promise<ListRoleDto[]> {
    return this.roleService.findAllFranchiseRoles(idfranchise);
  }

  @Get('school/:idschool')
  @ApiOperation({
    summary: 'List all roles by school'
  })
  @UsePipes(new JoiValidationPipe(schoolIdSchema))
  findAllSchoolRoles(
    @Param('idschool') idschool: string
  ): Promise<ListRoleDto[]> {
    return this.roleService.findAllSchoolRoles(idschool);
  }

  @Patch(':roleid')
  @ApiOperation({
    summary: 'Update a role name'
  })
  @ApiBody({
    type: UpdateRoleDto
  })
  update(
    @Param('roleid',new JoiValidationPipe(roleIdSchema)) roleid: string,
    @Body(new JoiValidationPipe(nameSchema)) payload: UpdateRoleDto
  ): Promise<UpdateRoleResponseDto> {
    return this.roleService.update(+roleid, payload.name);
  }

  @Delete(':roleid')
  @ApiOperation({
    summary: 'Delete a role'
  })
  @UsePipes(new JoiValidationPipe(roleIdSchema))
  remove(@Param('roleid') roleid: string): Promise<UpdateRoleResponseDto> {
    return this.roleService.remove(+roleid);
  }
}
