import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IRole } from "@modules/role/interfaces";

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
    nullable: true
  })
  franchiseid: string;
  @Column({
    name: 'fk_schoolid',
    type: 'text',
    nullable: true
  })
  schoolid: string;
}
