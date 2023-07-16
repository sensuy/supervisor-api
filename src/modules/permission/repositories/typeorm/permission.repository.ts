import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPermissionRepository } from "@modules/permission/interfaces/permission-repository.interface";
import { Permission } from "./permission.entity";
import { CreatePermissionDto } from "@modules/permission/dto/create-role.dto";


export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>
  ) { }

  create(data: CreatePermissionDto): Permission {
    return this.repository.create(data);
  }

  save(permission: Permission): Promise<Permission> {
    return this.repository.save(permission);
  }

  findOne(permissionid: string): Promise<Permission | null> {
    return this.repository.findOne({ where: { permissionid } });
  }


}