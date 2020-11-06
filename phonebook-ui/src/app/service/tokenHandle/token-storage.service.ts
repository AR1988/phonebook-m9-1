import {Injectable} from '@angular/core';
import {User} from "../../model/user";

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {
  }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isTokenExist(): boolean {
    return localStorage.getItem('auth-token') !== null;
  }

  saveUser(user: User): void {
    localStorage.setItem("userEmail", user.email);
    if (user.roles.includes('ROLE_ADMIN'))
      localStorage.setItem("userAdmin", user.email);
  }

  isUserAdmin(): boolean {
    return localStorage.getItem("userEmail") === localStorage.getItem("userAdmin");
  }
}
