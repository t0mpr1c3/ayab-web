import AccessToken from './access-token.model';
import User from './user.model'

export default interface LoginResponse extends AccessToken {
  user: User,
}