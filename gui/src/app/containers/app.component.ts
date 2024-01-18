import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromLayout from '../core/actions/layout.actions';
import * as fromImage from '../core/actions/image.actions';
import * as fromTest from '../test/actions/test.actions';
import * as fromKnit from '../knit/actions/knit.actions';
import * as fromAuth from '../auth/actions/auth.actions';

import { ImageLoadedService } from '../core/services/image-loaded.service';
import { User } from '../../../../shared/src/models/user.model';
import { LayoutComponent } from '../core/components/layout.component';
import { TestComponent } from './test.components';
import { KnitComponent } from './knit.component';
import { FirmwareComponent } from './firmware.component';
import { ProfileComponent } from './profile.component';

/**
 * @title App component
 */
@Component({
  standalone: true,
  selector: 'app',
  template: `  
    <profile></profile>
    <knit></knit>
    <test></test>
    <firmware></firmware>
    <layout (showOptions)="showOptions()" (hideOptions)="hideOptions()"></layout>
    `,
  imports: [
    LayoutComponent,    
    ProfileComponent,
    KnitComponent,
    TestComponent,
    FirmwareComponent,
  ]
})
export class AppComponent {
  constructor(
    private _store: Store<fromRoot.State>,
    private _imageLoadedService: ImageLoadedService,
  ) {
    this._imageLoadedService.imageLoaded.subscribe(() => {
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
  
  public hideOptions(): void {
    this._store.dispatch(fromLayout.hideOptions());
  }

  public showOptions(): void {
    this._store.dispatch(fromLayout.showOptions());
  }

  public startTesting(): void {
    this._store.dispatch(fromTest.startTesting());
  }

  public stopTesting(): void {
    this._store.dispatch(fromTest.stopTesting());
  }

  public startKnitting(): void {
    this._store.dispatch(fromKnit.startKnitting());
  }

  public stopKnitting(): void {
    this._store.dispatch(fromKnit.stopKnitting());
  }

  public imageLoaded(): void {
    this._store.dispatch(fromImage.imageLoaded());
  }

  public boot(): void {
    this._store.dispatch(fromAuth.boot());
  }

  public isLoggedIn(user: User): void {
    this._store.dispatch(fromAuth.isLoggedIn({ user }));
  }

  public isLoggedOut(): void {
    this._store.dispatch(fromAuth.isLoggedOut());
  }
}