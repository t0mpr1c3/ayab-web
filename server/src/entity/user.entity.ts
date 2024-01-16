import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import { compare, hash } from 'bcryptjs';

import { Role } from '../../../shared/src/models/user.model';
import { SettingsEntity } from './settings.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 20)
  username: string;

  @Column()
  @Length(5, 60)
  email: string;

  @Column()
  @Length(5, 60) // bcrypt produces 60 character hashes
  password: string;

  @Column()
  @IsNotEmpty()
  role: Role;

  @Column()
  @CreateDateColumn()
  created: Date;

  @Column()
  @UpdateDateColumn()
  updated: Date;
  
  @OneToOne(() => SettingsEntity, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinColumn()
  settings: SettingsEntity

  @Column()
  settingsId: number

  async encrypt(unencryptedPassword: string) {
    return await hash(unencryptedPassword, 8);
  }

  async encryptPassword() {
    this.password = await this.encrypt(this.password);
  }

  async isUnencryptedPasswordValid(unencryptedPassword: string) {
    return compare(unencryptedPassword, this.password);
  }
}