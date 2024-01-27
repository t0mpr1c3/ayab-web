import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { MachineEnum } from '../../../shared/src/models/machine-enum.model';
import { ModeEnum } from '../../../shared/src/models/mode-enum.model';
import { AlignmentEnum } from '../../../shared/src/models/alignment-enum.model';

@Entity()
export default class SettingsEntity {
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