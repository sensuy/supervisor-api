import { Controller, Post, Body, UsePipes, Inject } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
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
  @ApiBadRequestResponse({
    description: 'Validations error',
  })
  @ApiConflictResponse({
    description: 'The email has already been registered',
  })
  @UsePipes(new JoiValidationPipe(userCreateSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.create(createUserDto);
  }
}
