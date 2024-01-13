import { User } from '../../../../../../../shared/src/models/user.model';

const userKey = 'user' as const;
const tokenKey = 'jwt' as const;

export function isLoggedOut(): boolean {
  return !localStorage.getItem(userKey);
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(userKey);
}

export function getToken(): string|null {
  return localStorage.getItem(tokenKey);
}

export function setToken(token: string): void {
  localStorage.setItem(tokenKey, token);
}

export function removeToken(): void {
  localStorage.removeItem(tokenKey);
}

export function getUser(): User|null {
  return JSON.parse(localStorage.getItem(userKey) || '{}');
}

export function setUser(userData: User): void {
  localStorage.setItem(userKey, JSON.stringify(userData));
}

export function removeUser(): void {
  localStorage.removeItem(userKey);
  removeToken();
}