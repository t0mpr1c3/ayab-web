import { Settings, defaultSettings } from "./settings.model";

export interface User {
  id: number;
  username: string;
  email: string;
  settings: Settings;
  role: Role;
}

export const defaultUserData: User = {
  id: 0,
  username: '',
  email: '',
  settings: defaultSettings,
  role: 'USER',
}

export type Role = 'USER' | 'ADMIN';
