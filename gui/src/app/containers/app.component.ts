import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as root from '../reducers';
import * as layout from '../core/actions/layout.actions';
import * as test from '../core/actions/test.actions';
import * as knit from '../core/actions/knit.actions';
import * as auth from '../core/services/auth/actions/auth.actions';

import { ImageLoadedService } from '../core/services/image-loaded.service';
import { LayoutComponent } from '../core/components/layout.component';
import { getUser, isLoggedIn } from '../core/services/auth/helpers/auth';
import { User } from '../../../../shared/src/models/user.model';

/**
 * @title App component
 */
@Component({
  standalone: true,
  selector: 'app',
  template: `<layout (showOptions)="showOptions()" (hideOptions)="hideOptions()"></layout>`,
  imports: [LayoutComponent]
})
export class AppComponent {
  constructor(
    private _store: Store<root.State>,
    private _imageLoadedService: ImageLoadedService,
  ) {    
    this._imageLoadedService.imageLoaded$.subscribe(() => {
      this.showOptions();
      this.imageLoaded();
    })

    // boot authorization state
    if (!isLoggedIn()) {
      this.isLoggedOut();
    } else {
      this.isLoggedIn(getUser()!);
    }
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of the
   * application.
   */
  
  hideOptions(): void {
    this._store.dispatch(layout.hideOptions());
  }

  showOptions(): void {
    this._store.dispatch(layout.showOptions());
  }

  startTesting(): void {
    this._store.dispatch(test.startTesting());
  }

  stopTesting(): void {
    this._store.dispatch(test.stopTesting());
  }

  startKnitting(): void {
    this._store.dispatch(knit.startKnitting());
  }

  stopKnitting(): void {
    this._store.dispatch(knit.stopKnitting());
  }

  imageLoaded(): void {
    this._store.dispatch(knit.imageLoaded());
  }

  isLoggedIn(user: User): void {
    this._store.dispatch(auth.isLoggedIn({ user }));
  }

  isLoggedOut(): void {
    this._store.dispatch(auth.isLoggedOut());
  }
}