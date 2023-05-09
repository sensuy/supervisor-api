import { UserInterface } from "@users/interfaces";
import { CommonEntity } from "src/shared/common.entity";
import { Column, Entity } from "typeorm";

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
  @Column({ type: 'text', nullable: false })
  active: boolean;
}
