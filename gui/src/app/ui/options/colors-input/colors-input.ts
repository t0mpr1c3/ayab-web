import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** 
 * @title Colors input
 **/
@Component({
  standalone: true,
  selector: 'colors-input',
  templateUrl: 'colors-input.html',
  styleUrls: ['colors-input.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule,
  ]
})
export class ColorsInput {}