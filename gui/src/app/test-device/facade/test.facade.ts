import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as fromTest from '../actions/test.actions';

/**
 * @title Test facade
 */
@Injectable()
export class TestFacade {
  constructor(private _store: Store<fromRoot.State>) {}

  public startTesting(): void {
    this._store.dispatch(fromTest.startTestingAction());
  }

  public stopTesting(): void {
    this._store.dispatch(fromTest.stopTestingAction());
  }
}