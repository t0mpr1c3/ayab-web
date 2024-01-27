import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
  ViewChild, 
  booleanAttribute, 
  forwardRef 
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';
import MirrorIconComponent from './mirror-icon.component';

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
    },
  ]
})
export default class MirrorCheckboxComponent implements AfterViewInit {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) defaultValue: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean;

  @Output() checked: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('mirrorCheckbox') private _checkbox: MatCheckbox;
  @ViewChild('mirrorIcon') private _icon: MirrorIconComponent;

  private _checked: boolean = this.defaultValue;

  ngAfterViewInit(): void {
    this._checkbox.checked = this._checked;
    this.disable( this.disabled );
    this.control.valueChanges.subscribe(val => this.check(val as boolean)); // allow reset on hydration
  }
  
  public check(checked: boolean): void {
    this._icon.mirror( checked );
    if (this._checked === checked) return;
    this._checked = checked;

    this.control.setValue( checked ); // sets checkmark on hydration
    this.checked.emit( checked );
  }

  public disable(isDisabled: boolean): void {
    this._checkbox.disabled = isDisabled;
    this._icon.disable( isDisabled );
  }
}