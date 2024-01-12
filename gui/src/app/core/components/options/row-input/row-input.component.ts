import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TSetting } from '../../../models/settings.model';

/** 
 * @title Row Start input
 **/
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'row-input',
  templateUrl: 'row-input.component.html',
  styleUrls: ['row-input.component.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule,
  ]
})
export class RowInput {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean;
}