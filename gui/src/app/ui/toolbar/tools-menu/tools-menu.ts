import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @title Tools menu
 */
 @Component({
  standalone : true,
  selector: 'tools-menu',
  templateUrl: 'tools-menu.html',
  styleUrls: ['tools-menu.css'],
imports: [
  MatButtonModule, 
  MatMenuModule,
],
})
export class ToolsMenu {}
