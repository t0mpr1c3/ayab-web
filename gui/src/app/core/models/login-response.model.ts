import { User } from "../../../../../shared/src/models/user.model";

export interface LoginResponse {
  user: User,
  access_token: string,
  token_type: string,
  expires_in?: string,
  refresh_token?: string,
}