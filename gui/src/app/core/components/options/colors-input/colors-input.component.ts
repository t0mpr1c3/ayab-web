import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';

import { TSetting } from '../../../models/settings.model';

/** 
 * @title Colors input
 **/
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'colors-input',
  templateUrl: 'colors-input.component.html',
  styleUrls: ['colors-input.component.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule,
  ]
})
export class ColorsInput {
  @Input() disabled: boolean = false;
  @Input({ required: true }) control: FormControl<TSetting>;
}