import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  OnInit,  
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import OptionsFacade from '../../facade/options.facade';
import EnumHelper from '../../../../../../../shared/src/helpers/enum.helper';
import OptionsHelper from '../../helper/options.helper';
import OptionsValidator from '../../helper/options-validator';
import OptionsService from '../../services/options.service';
import { AlignmentEnum } from '../../../../../../../shared/src/models/alignment-enum.model';
import { ColorEnum } from '../../../../../../../shared/src/models/color-enum.model';
import { MachineEnum } from '../../../../../../../shared/src/models/machine-enum.model';
import { ModeEnum } from '../../../../../../../shared/src/models/mode-enum.model';
import { TSetting, defaultSettings } from '../../../../../../../shared/src/models/settings.model';

/**
 * @title Options panel component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'options-panel',
  templateUrl: 'options-panel.component.html',
  styleUrls: ['options-panel.component.css'],
  providers: [OptionsFacade],
})
export default class OptionsPanelComponent implements OnInit, AfterViewInit {
  public alignmentEnum = EnumHelper.enumArray( AlignmentEnum );
  public disabled: boolean;
  public enableOptions$ = this._facade.enableOptions$;
  public form: FormGroup;
  public machine$ = this._facade.machine$;
  public modeEnum = EnumHelper.enumArray(ModeEnum);
  public rows$ = this._facade.rows$;
  public width$ = this._facade.width$;
  private _enableOptions = new BehaviorSubject<boolean>( false );

  constructor(
    public optionsService: OptionsService,
    private _facade: OptionsFacade,
    private _formBuilder: FormBuilder,
  ) {
    this.enableOptions$.subscribe( this._enableOptions );
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group(
      this.optionsService.formControls,
      { validators: [
        OptionsValidator.modeValidator('mode', 'colors'),
        OptionsValidator.needleValidator('startNeedle', 'startColor', 'stopNeedle', 'stopColor'),
      ]}
    );
  }

  ngAfterViewInit(): void {
    this._enableOptions.subscribe( enable => this.disable( !enable ));
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }
  
  public disable(isDisabled: boolean): void {
    (isDisabled) ? 
      this.form.disable() : 
      this.form.enable();
  }

  public modeChanged(mode: ModeEnum): void {
    this.optionsService.formControls.mode?.setValue( mode ); // validate
    this._facade.setKnittingModeOption( mode );
    this._facade.setOptionsValidity( !this.form.invalid );
  }

  public colorsChanged(event: Event): void {
    let value = OptionsHelper.parseNumberFromEvent( event );
    this.optionsService.formControls.colors?.setValue( value ); // validate
    this._facade.setColorsOption( value );
    this._facade.setOptionsValidity( !this.form.invalid );
  }

  public rowChanged(event: Event): void {
    let value = OptionsHelper.parseNumberFromEvent( event );
    this.optionsService.formControls.startRow?.setValue( value ); // validate
    this._facade.setStartRowOption( value );
    this._facade.setOptionsValidity( !this.form.invalid );
  }

  public startNeedleChanged(event: Event): void {
    let value = OptionsHelper.parseNumberFromEvent( event );
    this.optionsService.formControls.startNeedle?.setValue( value ); // validate
    this._facade.setStartNeedleOption( value );
    this._facade.setOptionsValidity( !this.form.invalid );
  }

  public startColorChanged(startColor: ColorEnum): void {
    this.optionsService.formControls.startColor?.setValue( startColor ); // validate
    this._facade.setStartColorOption( startColor );
    this._facade.setOptionsValidity( !this.form.invalid );
  }

  public stopNeedleChanged(event: Event): void {
    let value = OptionsHelper.parseNumberFromEvent( event );
    this.optionsService.formControls.stopNeedle?.setValue( value ); // validate
    this._facade.setStopNeedleOption( value );
    this._facade.setOptionsValidity( !this.form.invalid );
  }

  public stopColorChanged(stopColor: ColorEnum): void {
    this.optionsService.formControls.stopColor?.setValue( stopColor ); // validate
    this._facade.setStopColorOption( stopColor );
    this._facade.setOptionsValidity( !this.form.invalid );
  }

  public infRepeatChecked(checked: boolean): void {
    this._facade.setInfiniteRepeatOption( checked );
  }

  public alignmentChanged(alignment: AlignmentEnum): void {
    this._facade.setAlignmentOption( alignment );
  }

  public knitSideChecked(checked: boolean): void {
    this._facade.setKnitSideOption( checked );
  }
}