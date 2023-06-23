import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { IRoleRepository } from "@modules/role/interfaces/role-repository.interface";
import { CreateRoleDto } from "@modules/role/dto/create-role.dto";


export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.repository.create(createRoleDto);
  }

  async save(role: Role): Promise<Role> {
    return this.repository.save(role);
  }

  findAllFranchiseRoles(idfranchise: string): Promise<Role[]> {
    return this.repository.find({ where: { idfranchise, active: true } });
  }

}