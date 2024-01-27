import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output, 
  booleanAttribute, 
  forwardRef, 
  numberAttribute 
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';

/** 
 * @title Generic select component
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'generic-select',
  templateUrl: 'generic-select.component.html',
  styleUrls: ['generic-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericSelectComponent),
      multi: true,
    }
  ]
})
export default class GenericSelectComponent implements OnInit {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: numberAttribute }) defaultValue: number = 0;
  @Input({ required: true }) enum: string[];
  @Input({ required: true }) name: string;

  @Output() change = new EventEmitter<number>();

  public selection: number;

  constructor() {
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

  public onValueChange(value: number) {
    this.change.emit(value);
  }

  public refresh() {
    this.selection = this.defaultValue; // FIXME update from settings
  }
}