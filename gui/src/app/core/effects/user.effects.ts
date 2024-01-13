import { Injectable } from '@angular/core';

import { fromEvent, merge, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { createEffect } from '@ngrx/effects';
import { idleTimeout } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  clicks$ = fromEvent(document, 'click');
  keys$ = fromEvent(document, 'keydown');
  mouse$ = fromEvent(document, 'mousemove');

  idle$ = createEffect(() =>
    merge(this.clicks$, this.keys$, this.mouse$).pipe(
      // 15 minute inactivity timeout
      switchMap(() => timer(15 * 60 * 1000)),
      map(() => idleTimeout())
    )
  );
}