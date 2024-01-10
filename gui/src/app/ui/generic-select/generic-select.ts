import { Component, Input, OnInit, forwardRef, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** 
 * @title Generic select
 **/
@Component({
  standalone: true,
  selector: 'generic-select',
  templateUrl: 'generic-select.html',
  styleUrls: ['generic-select.css'],
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
      useExisting: forwardRef(() => GenericSelect),
      multi: true,
    }
  ]
})
export class GenericSelect implements OnInit {
  @Input({ required: true }) name: string;
  @Input({ required: true }) enum: string[];
  @Input() control: FormControl;
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