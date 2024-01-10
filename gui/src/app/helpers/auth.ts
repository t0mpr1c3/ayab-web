import { UserData } from "../models/UserData";

export function isLoggedOut(): boolean {
  return !localStorage.getItem('userData');
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('userData');
}

export function getToken(): string|null {
  return localStorage.getItem('jwt');
}

export function setToken(token: string): void {
  localStorage.setItem('jwt', token);
}

export function removeToken(): void {
  localStorage.removeItem('jwt');
}

export function getUserData(): UserData|null {
  return JSON.parse(localStorage.getItem('userData') || '{}');
}

export function setUserData(userData: UserData): void {
  localStorage.setItem('userData', JSON.stringify(userData));
}

export function removeUserData(): void {
  localStorage.removeItem('userData');
  removeToken();
}