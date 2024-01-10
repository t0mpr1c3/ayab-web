import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';

import { OptionsVisibilityService } from '../services/optionsVisibility.service';
import { Toolbar } from './toolbar/toolbar';
import { OptionsPanel } from './options/options-panel';

/**
 * @title User interface
 */
@Component({
  standalone: true,
  selector: 'ui',
  templateUrl: 'ui.html',
  styleUrls: ['ui.css'],
  imports: [
    CommonModule,
    Toolbar,
    OptionsPanel,
    MatButtonModule,
    MatIconModule,
  ]
})
export class Ui implements OnInit, OnDestroy {
  public visible$: Observable<boolean>;
  private _visibilitySubscription: Subscription;

  constructor(private _visibilityService: OptionsVisibilityService) {}
  
  ngOnInit(): void {
    this.visible$ = this._visibilityService.visible();
    this._visibilitySubscription = this.visible$.subscribe();
  }

  ngOnDestroy(): void {
    this._visibilitySubscription.unsubscribe();
  }
  
  public hide() {
    this._visibilityService.hide();
  }
  
  public show() {
    this._visibilityService.show();
  }
}