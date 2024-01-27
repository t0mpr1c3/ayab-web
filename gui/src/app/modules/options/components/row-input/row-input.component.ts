import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  booleanAttribute, 
  numberAttribute 
} from '@angular/core';
import { FormControl } from '@angular/forms';

import OptionsFacade from '../../facade/options.facade';
import { TSetting } from '../../../../../../../shared/src/models/settings.model';

/** 
 * @title Row Start input
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'row-input',
  templateUrl: 'row-input.component.html',
  styleUrls: ['row-input.component.css'],
  providers: [OptionsFacade],
})
export default class RowInputComponent {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: numberAttribute }) rows: number | null;
  @Input({ transform: booleanAttribute }) disabled: boolean;

  constructor(private _facade: OptionsFacade) {}

  public onChange(): void {
    this._facade.setStartRowOption(this.control.value as number);
  }
}