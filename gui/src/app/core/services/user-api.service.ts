import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { User } from '../../../../../shared/src/models/user.model';
import { defaultSettings } from '../../../../../shared/src/models/settings.model';
import { RegistrationCredentials } from '../../../../../shared/src/models/credentials.model';
import { StatusMaybeWithToken } from '../../../../../shared/src/models/status.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private _apiService: ApiService) {}

  public update(user: Partial<User>): Observable<StatusMaybeWithToken> {
    return this._apiService
      .patch( `/user/update/${user.id}`, user)
      .pipe( catchError(err => of({ ...err.error })));
  }

  public register(credentials: RegistrationCredentials): Observable<StatusMaybeWithToken> {
    return this._apiService
      .post( '/user/register', {
        username: credentials.username,
        email:    credentials.email,
        password: credentials.password,
        settings: defaultSettings,
        role:     'USER',
      })
      .pipe( catchError(err => of({ ...err.error })));
  }
}