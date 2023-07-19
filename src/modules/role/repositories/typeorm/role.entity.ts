import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IRole } from "@modules/role/interfaces";
import { PermissionRole } from "@modules/permission-role/repositories/typeorm/permission-role.entity";

@Entity('role')
export class Role extends CommonEntity implements IRole {
  @PrimaryGeneratedColumn('increment')
  roleid: number;
  @Column({
    type: 'text'
  })
  name: string;
  @Column({
    name: 'fk_franchiseid',
    type: 'text',
    nullable: true,
    default: null
  })
  franchiseid: string;
  @Column({
    name: 'fk_schoolid',
    type: 'text',
    nullable: true,
    default: null
  })
  schoolid: string;

  @OneToMany(() => PermissionRole, permissionRole => permissionRole.role)
  permissionRoles: PermissionRole[];
}
