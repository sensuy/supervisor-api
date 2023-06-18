import { Column, Entity } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IUser } from "@shared/interfaces";

@Entity('user')
export class User extends CommonEntity implements IUser { 
  @Column({ type: 'text', nullable: false })
  username: string;
  @Column({ type: 'text', nullable: false })
  email: string; 
  @Column({ type: 'text', nullable: false })
  password: string;
  @Column({ type: 'text', nullable: false })
  salt: string;
}
