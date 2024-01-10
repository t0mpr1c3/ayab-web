import { MigrationInterface, QueryRunner } from 'typeorm';

import { dataSource } from '../models/dataSource';
import { UserEntity } from '../entity/UserEntity';
import { defaultSettings } from '../models/SettingsData';
import { SettingsEntity } from '../entity/SettingsEntity';

export class CreateAdminUser1704140647315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // save new user
    let user = new UserEntity();
    user.username = 'admin';
    user.email = 't0mpr1c3@gmail.com';
    user.password = 'admin';
    await user.encryptPassword();
    user.role = 'ADMIN';
    let settings = new SettingsEntity();
    settings.machine   = defaultSettings.machine;
    settings.mode      = defaultSettings.mode;
    settings.infRepeat = defaultSettings.infRepeat;
    settings.alignment = defaultSettings.alignment;
    settings.knitSide  = defaultSettings.knitSide;
    settings.quietMode = defaultSettings.quietMode;
    user.settings = settings;
    await dataSource
      .manager
      .save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
