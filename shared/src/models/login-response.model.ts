import { AccessToken } from './access-token.model';
import { User } from './user.model'

export interface LoginResponse extends AccessToken {
  user: User,
}