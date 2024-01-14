import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @title Image Actions menu
 */
 @Component({
  standalone : true,
  selector: 'image-actions-menu',
  templateUrl: 'image-actions-menu.component.html',
  styleUrls: ['image-actions-menu.component.css'],
  imports: [
    MatButtonModule, 
    MatMenuModule,
  ],
})
export class ImageActionsMenuComponent {}
