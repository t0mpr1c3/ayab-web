import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TSetting } from '../../../models/Settings';

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
export class RowInput {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input() disabled: boolean;
}