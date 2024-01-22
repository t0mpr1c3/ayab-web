import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KnitFacade } from '../../../knit/facade/knit.facade';

/** 
 * @title Knit button component
 **/
@Component({
  selector: 'knit-button',
  templateUrl: 'knit-button.component.html',
  styleUrls: ['knit-button.component.css'],
  providers: [KnitFacade],
})
export class KnitButtonComponent {
  public enabled$ = this._facade.knitButtonEnabled$;

  constructor(
    private _facade: KnitFacade,    
    private _snackBar: MatSnackBar,
  ) {}

  public knit(): void {
    this._facade.startKnitting();
    this._snackBar.open('Get ready to knit', 'OK');
  }
}