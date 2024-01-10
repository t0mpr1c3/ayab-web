import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { MachineEnum } from '../models/MachineEnum';
import { ModeEnum } from '../models/ModeEnum';
import { AlignmentEnum } from '../models/AlignmentEnum';

@Entity()
export class SettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  machine: MachineEnum;

  @Column()
  @IsNotEmpty()
  mode: ModeEnum;

  @Column()
  @IsNotEmpty()
  infRepeat: boolean;

  @Column()
  @IsNotEmpty()
  alignment: AlignmentEnum;

  @Column()
  @IsNotEmpty()
  knitSide: boolean;

  @Column()
  @IsNotEmpty()
  quietMode: boolean;
}