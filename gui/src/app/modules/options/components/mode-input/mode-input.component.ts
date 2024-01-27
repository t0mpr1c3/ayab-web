import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import EnumHelper from '../../../../../../../shared/src/helpers/enum.helper';
import { TSetting } from '../../../../../../../shared/src/models/settings.model';
import { ModeEnum } from '../../../../../../../shared/src/models/mode-enum.model';

/** 
 * @title Colors input component
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mode-input',
  templateUrl: './mode-input.component.html',
  styleUrls: ['./mode-input.component.css'],
})
export default class ModeInputComponent {
  @Input({ required: true }) modeControl: FormControl<TSetting>;
  @Input({ required: true }) colorsControl: FormControl<TSetting>;
  @Input() disabled: boolean = false;

  @HostBinding('style.opacity') get opacity() {
    return this.disabled ? '.38' : '.87';
  }

  public enum = EnumHelper.enumArray(ModeEnum);
  public selection: number;
}