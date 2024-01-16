import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';

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
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
  ]
})
export class ColorsInputComponent {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input() disabled: boolean = false;
}