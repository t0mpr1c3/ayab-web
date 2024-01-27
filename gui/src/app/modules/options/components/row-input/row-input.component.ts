import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
  booleanAttribute, 
  numberAttribute 
} from '@angular/core';
import { FormControl } from '@angular/forms';

import OptionsFacade from '../../facade/options.facade';
import { TSetting } from '../../../../../../../shared/src/models/settings.model';

/** 
 * @title Row start input component
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
}