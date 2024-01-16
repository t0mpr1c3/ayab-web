import { MigrationInterface, QueryRunner } from 'typeorm';

import { dataSource } from '../models/data-source.model';
import { UserEntity } from '../entity/user.entity';
import { TSetting, defaultSettings } from '../../../shared/src/models/settings.model';
import { SettingsEntity } from '../entity/settings.entity';

export class CreateAdminUser1704140647315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // save new user
    let user = new UserEntity();
    let defaults = defaultSettings as any;
    user.username = 'admin';
    user.email = 't0mpr1c3@gmail.com';
    user.password = 'admin';
    await user.encryptPassword();
    user.role = 'ADMIN';
    let settings = new SettingsEntity();
    settings.machine   = defaults.machine;
    settings.mode      = defaults.mode;
    settings.infRepeat = defaults.infRepeat;
    settings.alignment = defaults.alignment;
    settings.knitSide  = defaults.knitSide;
    settings.quietMode = defaults.quietMode;
    user.settings = settings;
    await dataSource
      .manager
      .save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
