import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, CreateRoleResponseDto } from './dto/create-role.dto';
import { UpdateRoleDto, UpdateRoleResponseDto } from './dto/update-role.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { roleCreateSchema } from './schemas/role-create.schema';
import { nameSchema } from './schemas/name.schema';
import { franchiseIdSchema } from './schemas/franchiseid.schema';
import { schoolIdSchema } from './schemas/schoolid.schema';
import { roleIdSchema } from './schemas/roleid.schema';
import { ListRoleDto } from './dto/list-role.dto';
import { BadRequestDto, NotFoundDto } from '@shared/errors';
import { Not } from 'typeorm';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new role'
  })
  @ApiCreatedResponse({
    description: 'The role has been successfully created.',
    type: CreateRoleResponseDto 
  })
  @ApiBadRequestResponse({
    description: 'Validation failed.',
    type: BadRequestDto
  })
  @UsePipes(new JoiValidationPipe(roleCreateSchema))
  create(@Body() createRoleDto: CreateRoleDto): Promise<CreateRoleResponseDto> {
    return this.roleService.create(createRoleDto);
  }

  @Get('franchise/:idfranchise')
  @ApiOperation({
    summary: 'List all roles by franchise'
  })
  @ApiOkResponse({
    description: 'The roles has been successfully listed.',
    type: [ListRoleDto]
  })
  @ApiBadRequestResponse({
    description: 'Validation failed.',
    type: BadRequestDto
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
  @ApiOkResponse({
    description: 'The roles has been successfully listed.',
    type: [ListRoleDto]
  })
  @ApiBadRequestResponse({
    description: 'Validation failed.',
    type: BadRequestDto
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
  @ApiOkResponse({
    description: 'The role has been successfully updated.',
    type: UpdateRoleResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Validation failed.',
    type: BadRequestDto
  })
  @ApiNotFoundResponse({
    description: 'Role not found',
    type: NotFoundDto
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
  @ApiOkResponse({
    description: 'The role has been successfully deleted',
    type: UpdateRoleResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: BadRequestDto
  })
  @ApiNotFoundResponse({
    description: 'Role not found',
    type: NotFoundDto
  })
  @UsePipes(new JoiValidationPipe(roleIdSchema))
  remove(@Param('roleid') roleid: string): Promise<UpdateRoleResponseDto> {
    return this.roleService.remove(+roleid);
  }
}
