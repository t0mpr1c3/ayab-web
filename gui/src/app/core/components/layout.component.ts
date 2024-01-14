import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as root from '../../reducers';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { OptionsPanelComponent } from './options/options.component';

/**
 * @title Layout component
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    OptionsPanelComponent,
  ]
})
export class LayoutComponent {
  @Output() showOptions = new EventEmitter<void>();
  @Output() hideOptions = new EventEmitter<void>();
  
  public showOptions$: Observable<boolean>;

  constructor(private _store: Store<root.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showOptions$ = this._store.select(root.selectShowOptions);
  }
}