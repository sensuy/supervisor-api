import { Column, Entity } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IRole } from "@modules/role/interfaces";

@Entity('role')
export class Role extends CommonEntity implements IRole {
  @Column({
    type: 'text',
    nullable: false
  })
  name: string;
  @Column({ 
    name: 'fk_idfranchise', 
    type: 'text' 
  })
  idfranchise: string;
  @Column({
    name: 'fk_idschool', 
    type: 'text' 
  })
  idschool: string;
}
