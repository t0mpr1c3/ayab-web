import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @title Tools menu
 */
 @Component({
  standalone : true,
  selector: 'tools-menu',
  templateUrl: 'tools-menu.component.html',
  styleUrls: ['tools-menu.component.css'],
imports: [
  MatButtonModule, 
  MatMenuModule,
],
})
export class ToolsMenuComponent {}
