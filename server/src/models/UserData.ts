import { SettingsData } from "./SettingsData";

export interface UserData {
  id: number;
  username: string;
  email: string;
  settings: SettingsData;
  role: Role;
}

//export type TSetting = number | boolean;
export type Role = 'USER' | 'ADMIN';
