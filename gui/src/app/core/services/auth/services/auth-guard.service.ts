import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { loginRedirect } from '../actions/auth-api.actions';
import { selectLoggedIn } from '../reducers/auth';

export const authGuard = (): Observable<boolean> => {
  const store = inject(Store);

  return store.select(selectLoggedIn).pipe(
    map((authed) => {
      if (!authed) {
        store.dispatch(loginRedirect());
        return false;
      } else {
        return true;
      }
    }),
    take(1)
  );
};