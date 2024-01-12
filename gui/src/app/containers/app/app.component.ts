import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as root from '../../reducers';
import * as layout from '../../core/actions/layout.actions';
import * as test from '../../core/actions/test.actions';
import * as knit from '../../core/actions/knit.actions';

import { ImageLoadedService } from '../../core/services/image-loaded.service';
import { Toolbar } from '../../core/components/toolbar/toolbar.component';
import { OptionsPanel } from '../../core/components/options/options.component';

/**
 * @title App component
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  imports: [
    CommonModule,
    Toolbar,
    OptionsPanel,
    MatButtonModule,
    MatIconModule,
  ]
})
export class AppComponent {
  public showOptions$: Observable<boolean>;

  constructor(
    private _store: Store<root.State>,
    private _imageLoadedService: ImageLoadedService) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showOptions$ = this._store.select(root.selectShowOptions);
    
    this._imageLoadedService.imageLoaded$.subscribe(() => {
      this.showOptions();
      this.imageLoaded();
    })
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of our
   * application.
   */
  
  hideOptions() {
    this._store.dispatch(layout.hideOptions());
  }

  showOptions() {
    this._store.dispatch(layout.showOptions());
  }

  startTesting() {
    this._store.dispatch(test.startTesting());
  }

  stopTesting() {
    this._store.dispatch(test.stopTesting());
  }

  startKnitting() {
    this._store.dispatch(knit.startKnitting());
  }

  stopKnitting() {
    this._store.dispatch(knit.stopKnitting());
  }

  imageLoaded() {
    this._store.dispatch(knit.imageLoaded());
  }
}