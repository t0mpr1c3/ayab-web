import { AlignmentEnum } from "./AlignmentEnum"
import { MachineEnum } from "./MachineEnum"
import { ModeEnum } from "./ModeEnum"

export interface SettingsData {
  machine: MachineEnum,
  mode: ModeEnum,
  infRepeat: boolean,
  alignment: AlignmentEnum,
  knitSide: boolean,
  quietMode: boolean,
}

export const defaultSettings: SettingsData = {
  machine: MachineEnum.KH910_KH950i,
  mode: ModeEnum.Single_Bed,
  infRepeat: false,
  alignment: AlignmentEnum.Center,
  knitSide: false,
  quietMode: false,
};