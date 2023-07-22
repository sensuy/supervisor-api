import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IRole } from "@modules/role/interfaces";
import { Permission } from "@modules/permission/repositories/typeorm/permission.entity";
import { Auth } from "@modules/auth/repositories/auth.entity";

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

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: 'permission_role',
    joinColumn: {
      name: 'fk_roleid',
      referencedColumnName: 'roleid'
    },
    inverseJoinColumn: {
      name: 'fk_permissionid',
      referencedColumnName: 'permissionid'
    }
  })
  permissions?: Permission[];

  @OneToMany(() => Auth, auth => auth.role)
  authorizations?: Auth[];
}
