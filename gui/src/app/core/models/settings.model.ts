import { enumArray } from '../helpers/enum';
import { reduce } from '../helpers/reduce';
import { AlignmentEnum } from './alignment-enum.model';
import { MachineEnum } from './machine-enum.model';
import { ModeEnum } from './mode-enum.model';

// Type of generic setting value
export type TSetting = MachineEnum | ModeEnum | AlignmentEnum | boolean;

export interface Setting {
  key: string;
  title: string;
  type: string;
  default: TSetting;
  enum?: string[];
}

export const settings: Setting[] = [
  {
    key: 'machine',
    title: 'Machine',
    type: 'MachineEnum',
    default: MachineEnum.KH910_KH950i,
    enum: enumArray(MachineEnum),
  },
  {
    key: 'mode',
    title: 'Default Knitting Mode',
    type: 'ModeEnum',
    default: ModeEnum.Single_Bed,
    enum: enumArray(ModeEnum),
  },
  {
    key: 'infRepeat',
    title: 'Infinite Repeat',
    type: 'boolean',
    default: false,
  },
  {
    key: 'alignment',
    title: 'Default Alignment',
    type: 'AlignmentEnum',
    default: AlignmentEnum.Center,
    enum: enumArray(AlignmentEnum),
  },
  {
    key: 'knitSide',
    title: 'Default Knit Side Image',
    type: 'boolean',
    default: false,
  },
  {
    key: 'quietMode',
    title: 'Quiet Mode',
    type: 'boolean',
    default: false,
  },
];

// Create `Settings` interface from `settings` object
// https://stackoverflow.com/questions/45771307/typescript-dynamically-create-interface
type MapSchemaTypes = {
  MachineEnum: MachineEnum;
  ModeEnum: ModeEnum;
  AlignmentEnum: AlignmentEnum;
  boolean: boolean;
}
type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]: MapSchemaTypes[T[K]]
}
function asSchema<T extends Record<string, keyof MapSchemaTypes>>(t: T): T {
  return t;
}

const settingsSchema =
  asSchema(
    reduce(
      settings.map(setting => ({
        key: setting.key,
        value: setting.type,
      }))
    )
  );
export type Settings = MapSchema<typeof settingsSchema>;

export const defaultSettings: Settings =
  reduce(
    settings.map(setting => ({
      key: setting.key,
      value: setting.default,
    }))
  );