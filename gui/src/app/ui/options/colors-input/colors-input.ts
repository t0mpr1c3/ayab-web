import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';

import { TSetting } from '../../../models/Settings';

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
export class ColorsInput {
  @Input() disabled: boolean = false;
  @Input({ required: true }) control: FormControl<TSetting>;
}