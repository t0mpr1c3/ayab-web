import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @title Image Actions menu
 */
 @Component({
  standalone : true,
  selector: 'image-actions-menu',
  templateUrl: 'image-actions-menu.html',
  styleUrls: ['image-actions-menu.css'],
  imports: [
    MatButtonModule, 
    MatMenuModule,
  ],
})
export class ImageActionsMenu {}
