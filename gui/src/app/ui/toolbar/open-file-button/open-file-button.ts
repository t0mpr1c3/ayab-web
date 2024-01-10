import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** 
 * @title Open File button
 **/
@Component({
  standalone: true,
  selector: 'open-file-button',
  templateUrl: 'open-file-button.html',
  styleUrls: ['open-file-button.css'],
  imports: [MatButtonModule]
})
export class OpenFileButton {}