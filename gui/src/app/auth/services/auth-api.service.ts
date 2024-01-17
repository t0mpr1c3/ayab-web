import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { LoginCredentials } from '../../../../../shared/src/models/credentials.model';
import { LoginResponse } from '../../../../../shared/src/models/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private _apiService: ApiService) {}

  public login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this._apiService
      .post( '/auth/login', credentials);
  }
}
