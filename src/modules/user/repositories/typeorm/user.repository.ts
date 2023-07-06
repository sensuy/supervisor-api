import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../dto/create-user.dto";
import { IUserRepository } from "../../interfaces";
import { User } from "./user.entity";

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
		private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(userid: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userid }});
  }
}