export class LoginCredentials {
  public username: string;
  public password: string;

  constructor(_username: string, _password: string) {
    return {
      username: _username,
      password: _password,
    }
  }
}

export class RegistrationCredentials extends LoginCredentials {
  public email: string;
  public role:  string;

  constructor(_username: string, _email: string, _password: string) {
    super(_username, _password);
    return {
      username: _username,
      email:    _email,
      password: _password,
      role:     'USER',
    }
  }
}