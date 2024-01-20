import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';

/** 
 * @title Row Start input
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'row-input',
  templateUrl: 'row-input.component.html',
  styleUrls: ['row-input.component.css'],
})
export class RowInputComponent {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean;
}