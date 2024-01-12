import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** 
 * @title Cancel button
 **/
@Component({
  standalone: true,
  selector: 'cancel-button',
  templateUrl: 'cancel-button.component.html',
  styleUrls: ['cancel-button.component.css'],
  imports: [MatButtonModule]
})
export class CancelButton {}