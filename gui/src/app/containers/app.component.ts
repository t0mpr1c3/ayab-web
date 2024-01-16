import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromLayout from '../core/actions/layout.actions';
import * as fromTest from '../core/actions/test.actions';
import * as fromKnit from '../core/actions/knit.actions';
import * as fromAuth from '../auth/actions/auth.actions';

import { ImageLoadedService } from '../core/services/image-loaded.service';
import { LayoutComponent } from '../core/components/layout.component';
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
    private _store: Store<fromRoot.State>,
    private _imageLoadedService: ImageLoadedService,
  ) {
    this._imageLoadedService.imageLoaded$.subscribe(() => {
      this.showOptions();
      this.imageLoaded();
    })
    this.boot();
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of the
   * application.
   */
  
  hideOptions(): void {
    this._store.dispatch(fromLayout.hideOptions());
  }

  showOptions(): void {
    this._store.dispatch(fromLayout.showOptions());
  }

  startTesting(): void {
    this._store.dispatch(fromTest.startTesting());
  }

  stopTesting(): void {
    this._store.dispatch(fromTest.stopTesting());
  }

  startKnitting(): void {
    this._store.dispatch(fromKnit.startKnitting());
  }

  stopKnitting(): void {
    this._store.dispatch(fromKnit.stopKnitting());
  }

  imageLoaded(): void {
    this._store.dispatch(fromKnit.imageLoaded());
  }

  boot(): void {
    this._store.dispatch(fromAuth.boot());
  }

  isLoggedIn(user: User): void {
    this._store.dispatch(fromAuth.isLoggedIn({ user }));
  }

  isLoggedOut(): void {
    this._store.dispatch(fromAuth.isLoggedOut());
  }
}