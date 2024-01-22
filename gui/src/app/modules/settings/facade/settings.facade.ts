import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromUser from '../actions/settings.actions'

import { Settings } from '../../../../../../shared/src/models/settings.model';
import { firstValueFrom } from 'rxjs';

/**
 * @title Settings facade
 */
@Injectable()
export class SettingsFacade {
  constructor(
    private _store: Store<fromRoot.State>,
  ) {}
  
  public updateSettings(settings: Settings): void {
    this._store.dispatch(fromUser.updateSettingsAction({ settings: settings }));
  }}
