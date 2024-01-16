import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from '../../../../../shared/src/models/user.model';

const userKey = 'user' as const;
const tokenKey = 'jwt' as const;

export function getToken(): string|null {
  return localStorage.getItem(tokenKey);
}

export function setToken(token: string): void {
  localStorage.setItem(tokenKey, token);
}

export function maybeSetToken(token?: string): void {
  if (token) {
    setToken(token);
  }
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

export function tokenNotExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const exp = decoded.exp;
    if (!!exp && (Date.now() < exp * 1000)) {
      return true;
    }
  } catch (error) {}
  return false;
}

export function isLoggedIn(): boolean {
  return (
    !!localStorage.getItem(userKey) &&
    !!localStorage.getItem(tokenKey) &&
    tokenNotExpired(localStorage.getItem(tokenKey)!));
}

export function isLoggedOut(): boolean {
  return !isLoggedIn();
}