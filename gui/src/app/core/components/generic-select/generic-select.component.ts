import { ChangeDetectionStrategy, Component, Input, OnInit, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TSetting } from '../../../../../../shared/src/models/settings.model';

/** 
 * @title Generic select
 **/
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'generic-select',
  templateUrl: 'generic-select.component.html',
  styleUrls: ['generic-select.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericSelectComponent),
      multi: true,
    }
  ]
})
export class GenericSelectComponent implements OnInit {
  @Input({ required: true }) name: string;
  @Input({ required: true }) enum: string[];
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: numberAttribute }) defaultValue: number = 0;

  public selection: number;

  ngOnInit(): void {
    this.refresh();
  }

  constructor() {
    this.refresh();
  }

  public refresh() {
    this.selection = this.defaultValue; // FIXME update from settings
  }
}