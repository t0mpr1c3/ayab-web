import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { LoginCredentials } from '../models/credentials';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _apiService: ApiService) {}

  public login$(credentials: LoginCredentials): Observable<LoginResponse> {
    return this._apiService
      .post( '/auth/login', credentials);
  }
}
