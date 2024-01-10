import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** 
 * @title Needle input
 **/
@Component({
  standalone: true,
  selector: 'needle-input',
  templateUrl: 'needle-input.html',
  styleUrls: ['needle-input.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
  ]
})
export class NeedleInput {
  public side = "orange";
}