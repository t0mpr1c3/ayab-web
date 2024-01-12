import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
  booleanAttribute, 
  forwardRef, 
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

import { TSetting } from '../../models/settings.model';

/**
 * @title Generic checkbox
 */
@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'generic-checkbox',
    templateUrl: 'generic-checkbox.component.html',
    styleUrls: ['generic-checkbox.component.css'],
    imports: [
      MatCheckboxModule,
      ReactiveFormsModule,
    ],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GenericCheckbox),
        multi: true,
      }
    ]
})
export class GenericCheckbox {
  @Input({ required: true }) name: string;
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input() disabled: boolean = false;
  @Input({ transform: booleanAttribute }) defaultValue: boolean = false;

  @Output() clicked: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public onClick(event: MatCheckboxChange) {
    this.clicked.emit(event.checked);
  }
}