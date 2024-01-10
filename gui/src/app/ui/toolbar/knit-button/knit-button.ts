import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** 
 * @title Knit button
 **/
@Component({
  standalone: true,
  selector: 'knit-button',
  templateUrl: 'knit-button.html',
  styleUrls: ['knit-button.css'],
  imports: [MatButtonModule]
})
export class KnitButton {}