import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  ViewChild, 
  booleanAttribute, 
  forwardRef 
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';
import { MirrorIconComponent } from './mirror-icon.component';

/**
 * @title Mirror checkbox component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mirror-checkbox',
  templateUrl: 'mirror-checkbox.component.html',
  styleUrls: ['mirror-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MirrorCheckboxComponent),
      multi: true
    }
  ]
})
export class MirrorCheckboxComponent implements AfterViewInit {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) defaultValue: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean;

  @ViewChild('checkbox') private _checkbox: MatCheckbox;
  @ViewChild('icon') private _icon: MirrorIconComponent;

  public checked: boolean = this.defaultValue;

  constructor() {}

  ngAfterViewInit(): void {
    this._checkbox.checked = this.checked;
    this.disable(this.disabled);
  }
  
  public clicked(checked: boolean): void {
    this.checked = checked;
    this._icon.mirror(checked);
  }

  public disable(isDisabled: boolean): void {
    this._checkbox.disabled = isDisabled;
    this._icon.disable(isDisabled);
  }
}