import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { CreateRoleDto } from "@modules/role/dto/create-role.dto";
import { IRoleRepository } from "@modules/role/interfaces";


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

  findById(roleid: number): Promise<Role> {
    return this.repository.findOne({ where: { roleid } });
  }

  update(roleid: number, role: Role): Promise<Role> {
    return this.repository.save({ ...role, roleid });
  }

  findAllFranchiseRoles(idfranchise: string): Promise<Role[]> {
    return this.repository.find({ where: { idfranchise, active: true }, select: ['roleid', 'name'] });
  }

  findAllSchoolRoles(idschool: string): Promise<Role[]> {
    return this.repository.find({ where: { idschool, active: true }, select: ['roleid', 'name'] });
  }

}