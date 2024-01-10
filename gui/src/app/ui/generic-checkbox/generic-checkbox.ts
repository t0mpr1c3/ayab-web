import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

/**
 * @title Generic checkbox
 */
@Component({
    standalone: true,
    selector: 'generic-checkbox',
    templateUrl: 'generic-checkbox.html',
    styleUrls: ['generic-checkbox.css'],
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
  @Input() control: FormControl;
  @Input({ transform: booleanAttribute }) defaultValue: boolean = false;

  @Output() clicked: EventEmitter<Boolean> = new EventEmitter();

  constructor(

  ) {}

  public onClick(event: MatCheckboxChange) {
    this.clicked.emit(event.checked);
  }
}