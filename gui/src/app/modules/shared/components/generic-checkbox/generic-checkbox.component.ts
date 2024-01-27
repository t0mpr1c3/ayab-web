import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter,
  Input, 
  Output, 
  booleanAttribute, 
  forwardRef, 
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';

/**
 * @title Generic checkbox component
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'generic-checkbox',
    templateUrl: 'generic-checkbox.component.html',
    styleUrls: ['generic-checkbox.component.css'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GenericCheckboxComponent),
        multi: true,
      }
    ]
})
export default class GenericCheckboxComponent {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) defaultValue: boolean = false;
  @Input() disabled: boolean = false;
  @Input({ required: true }) name: string;

  @Output() checked = new EventEmitter<boolean>();

  constructor() {}

  public onChange(event: MatCheckboxChange) {
    this.checked.emit(event.checked);
  }
}