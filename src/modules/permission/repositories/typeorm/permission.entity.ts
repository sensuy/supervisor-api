import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IPermission } from "@modules/permission/interfaces/permission.interface";
import { PermissionOriginEnum } from "@modules/permission/enum/permission-type.enum";
import { Role } from "@modules/role/repositories/typeorm/role.entity";

@Entity('permission')
export class Permission extends CommonEntity implements IPermission {
  @PrimaryColumn()
  permissionid: string;

  @Column({ type: 'text' })
  label: string;

  @Column({
    type: "enum",
    enum: PermissionOriginEnum,
  })
  type: PermissionOriginEnum;

  @ManyToMany(() => Role, role => role.permissions)
  roles?: Role[];
}
