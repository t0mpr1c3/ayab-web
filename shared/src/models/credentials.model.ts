export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegistrationCredentials extends LoginCredentials {
  email: string;
  role: string;
}