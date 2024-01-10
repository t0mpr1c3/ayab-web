import { Component } from '@angular/core';

import { Toolbar } from '../../ui/toolbar/toolbar';
import { OptionsPanel } from '../../ui/options/options-panel';

/**
 * @title Application root
 */
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app-root.html',
  styleUrls: ['app-root.css'],
  imports: [
    Toolbar,
    OptionsPanel,
  ]
})
export class AppComponent {}