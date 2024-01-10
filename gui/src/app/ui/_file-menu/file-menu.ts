import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @title File menu
 */
 @Component({
  standalone : true,
  selector: 'file-menu',
  templateUrl: 'file-menu.html',
  styleUrls: ['file-menu.css'],
  imports: [
    MatButtonModule, 
    MatMenuModule,
  ],
})
export class FileMenu {}
