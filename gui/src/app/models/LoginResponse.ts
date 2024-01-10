import { UserData } from "./UserData";

export interface LoginResponse {
  user: UserData,
  access_token: string,
  token_type: string,
  expires_in?: string,
  refresh_token?: string,
}