import { Controller, Post, Body, UsePipes, Inject } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { userCreateSchema } from './schemas/user-create.schema';
import { BadRequestDto, ConflictDto } from '@shared/errors';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
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
    type: BadRequestDto,
  })
  @ApiConflictResponse({
    description: 'The email has already been registered',
    type: ConflictDto,
  })
  @UsePipes(new JoiValidationPipe(userCreateSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.create(createUserDto);
  }
}
