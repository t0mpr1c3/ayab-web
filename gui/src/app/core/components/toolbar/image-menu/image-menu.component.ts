import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @title Image Actions menu
 */
 @Component({
  standalone : true,
  selector: 'image-menu',
  templateUrl: 'image-menu.component.html',
  styleUrls: ['image-menu.component.css'],
  imports: [
    MatButtonModule, 
    MatMenuModule,
  ],
})
export class ImageMenuComponent {}
