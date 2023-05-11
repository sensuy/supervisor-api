import { Column, Entity } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { UserInterface } from "@users/interfaces";

@Entity('user')
export class User extends CommonEntity implements UserInterface { 
  @Column({ type: 'text', nullable: false })
  username: string;
  @Column({ type: 'text', nullable: false })
  email: string; 
  @Column({ type: 'text', nullable: false })
  password: string;
  @Column({ type: 'text', nullable: false })
  salt: string;
  @Column({ type: 'text', nullable: false, default: true })
  active: boolean;
}
