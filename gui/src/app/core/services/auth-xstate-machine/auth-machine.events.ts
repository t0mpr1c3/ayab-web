import { User } from "../../../../../../shared/src/models/user.model";
import { Status } from "../../../../../../shared/src/models/status.model";

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
    public userData: User,
    public token: string,
  ) {}
}

export class Logout {
  readonly type = 'LOGOUT';
}

export type AuthEvent = Init | LoginSubmit | LoginSuccess | LoginFail | Logout;