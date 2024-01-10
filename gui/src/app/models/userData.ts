import { Settings, defaultSettings } from "./Settings"

// FIXME share model definition files with front end

export type Role = 'USER' | 'ADMIN';

export interface UserData {
  id: number;
  username: string;
  email: string;
  settings: Settings;
  role: Role;
}

export const defaultUserData: UserData = {
  id: 0,
  username: '',
  email: '',
  settings: defaultSettings,
  role: 'USER',
};
