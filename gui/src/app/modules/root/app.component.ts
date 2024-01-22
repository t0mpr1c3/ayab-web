import { Component } from '@angular/core';

import { AuthFacade } from '../auth/facade/auth.facade';

/**
 * @title App component
 */
@Component({
  selector: 'app',
  template: `<layout></layout>`,
  providers: [AuthFacade],
})
export class AppComponent {
  constructor(private _facade: AuthFacade) {
    this._facade.boot();
  }
}