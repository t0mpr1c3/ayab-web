import { Status } from '../../models/status.model';
import { UserData } from '../../models/user-data.model';

export class Init {
  readonly type = 'INIT';
  constructor(public isLoggedOut: boolean) {}
}

export class LoginSubmit {
  readonly type = 'SUBMIT';
  constructor(public username: string, public password: string) {}
}

export class LoginFail {
  readonly type = 'FAILURE';
  constructor(public error: { error: Status }) {}
}

export class LoginSuccess {
  readonly type = 'SUCCESS';
  constructor(
    public userData: UserData,
    public token: string,
  ) {}
}

export class Logout {
  readonly type = 'LOGOUT';
}

export type AuthEvent = Init | LoginSubmit | LoginSuccess | LoginFail | Logout;