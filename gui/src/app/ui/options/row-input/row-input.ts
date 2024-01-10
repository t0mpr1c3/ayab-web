import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** 
 * @title Row Start input
 **/
@Component({
  standalone: true,
  selector: 'row-input',
  templateUrl: 'row-input.html',
  styleUrls: ['row-input.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule,
  ]
})
export class RowInput {}