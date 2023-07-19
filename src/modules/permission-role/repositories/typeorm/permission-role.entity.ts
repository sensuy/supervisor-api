import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IPermissionRole } from "@modules/permission-role/interfaces/permission-role.interface";
import { Role } from "@modules/role/repositories/typeorm/role.entity";
import { Permission } from "@modules/permission/repositories/typeorm/permission.entity";

@Entity('permission_role')
export class PermissionRole extends CommonEntity implements IPermissionRole {
  @PrimaryGeneratedColumn('increment')
  id: number;


  @ManyToOne(() => Permission, permission => permission.permissionRoles)
  @JoinColumn({ name: 'fk_permissionid' })
  permission: Permission;
  
  @ManyToOne(() => Role, role => role.permissionRoles)
  @JoinColumn({ name: 'fk_roleid' })
  role: Role;
}
