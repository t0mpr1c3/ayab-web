import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';

/** 
 * @title Colors input component
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'colors-input',
  templateUrl: 'colors-input.component.html',
  styleUrls: ['colors-input.component.css'],
})
export default class ColorsInputComponent {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input() disabled: boolean = false;
}