import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Inject } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { userCreateSchema } from './schemas/user-create.schema';
import { IUserService } from './interfaces';
import { IUSER_SERVICE } from './constants/user-layers.constants';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject(IUSER_SERVICE) 
    private readonly userService: IUserService
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Verify if a user already exist if not the user data and create a new user'
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: CreateUserResponseDto,
  })
  @UsePipes(new JoiValidationPipe(userCreateSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}