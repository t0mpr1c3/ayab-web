import { Component } from '@angular/core';

import { AuthFacade } from '../auth/facade/auth.facade';
import { LayoutComponent } from '../core/components/layout.component';

/**
 * @title App component
 */
@Component({
  standalone: true,
  selector: 'app',
  template: `<layout></layout>`,
  imports: [LayoutComponent],
  providers: [AuthFacade],
})
export class AppComponent {
  constructor(private _facade: AuthFacade) {
    this._facade.boot();
  }
}