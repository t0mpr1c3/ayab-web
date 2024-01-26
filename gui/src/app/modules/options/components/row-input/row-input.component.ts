import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { FormControl } from '@angular/forms';

import { OptionsFacade } from '../../facade/options.facade';
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
export class RowInputComponent {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean;

  public rows$ = this._facade.rows$;

  constructor(private _facade: OptionsFacade) {}
}