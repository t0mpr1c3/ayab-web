import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { UserEntity } from '../entity/user.entity';
import { SettingsEntity } from '../entity/settings.entity';

// for production environment:
// put password in an environment variable and parse using 'dotenv'
export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'blah',
  database: 'ayab',
  synchronize: true,
  logging: true,
  entities: [UserEntity, SettingsEntity],
  migrations: ['./src/migration/*.ts'],
  subscribers: [],
})