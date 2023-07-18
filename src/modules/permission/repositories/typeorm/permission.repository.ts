import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPermissionRepository } from "@modules/permission/interfaces/permission-repository.interface";
import { Permission } from "./permission.entity";
import { CreatePermissionDto } from "@modules/permission/dto/create-permission.dto";
import { PermissionOriginEnum } from "@modules/permission/enum/permission-type.enum";
import { ListPermissionDto } from "@modules/permission/dto/list-permission.dto";


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

  listPermissionByType(type: PermissionOriginEnum): Promise<ListPermissionDto[]> {
    return this.repository.find({
      where: {
        type,
        active: true
      },
      select: ['permissionid', 'label'],
    });
  }


}