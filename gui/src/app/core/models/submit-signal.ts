import * as fromLogin from '../../auth/actions/login.actions';
import * as fromAuth from '../../auth/actions/auth.actions';
import * as fromUser from '../../profile/actions/user.actions'

type SubmitAction = 
    typeof fromUser.registration
  | typeof fromLogin.loginSubmit
  | typeof fromUser.update
  | typeof fromAuth.logout

export interface SubmitSignal {
  action: SubmitAction;
  payload?: any;
}