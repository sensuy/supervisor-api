import { IPermissionRoleRepository } from "@modules/permission-role/interfaces/permission-role-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionRole } from "./permission-role.entity";
import { Repository } from "typeorm";

export class PermissionRoleRepository implements IPermissionRoleRepository {
  constructor(
    @InjectRepository(PermissionRole)
    private repository: Repository<PermissionRole>
  ) { }

}