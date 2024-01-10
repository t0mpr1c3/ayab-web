import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** 
 * @title Options form 
 **/
@Component({
  standalone: true,
  selector: 'options-form',
  templateUrl: 'options-form.html',
  styleUrls: ['options-form.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule,
  ],
})
export class OptionsForm {}