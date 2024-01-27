import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import OptionsFacade from '../../facade/options.facade';
import EnumHelper from '../../../../../../../shared/src/helpers/enum.helper';
import LocalStorageService from '../../../shared/services/local-storage.service';
import OptionsService from '../../services/options.service';
import { AlignmentEnum } from '../../../../../../../shared/src/models/alignment-enum.model';
import { ColorEnum } from '../../../../../../../shared/src/models/color-enum.model';
import { MachineEnum } from '../../../../../../../shared/src/models/machine-enum.model';
import { ModeEnum } from '../../../../../../../shared/src/models/mode-enum.model';
import { TSetting, defaultSettings } from '../../../../../../../shared/src/models/settings.model';
import MirrorCheckboxComponent from '../mirror-checkbox/mirror-checkbox.component';

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
  @ViewChild('mirrorCheckbox') private _mirrorCheckbox: MirrorCheckboxComponent;

  public alignmentEnum = EnumHelper.enumArray(AlignmentEnum);
  public disabled: boolean;
  public enableOptions$ = this._facade.enableOptions$;
  public form: FormGroup;
  public loggedIn$ = this._facade.loggedIn$;
  public machine$ = this._facade.machine$;
  public modeEnum = EnumHelper.enumArray(ModeEnum);
  public rows$ = this._facade.rows$;
  public width$ = this._facade.width$;
  private _enableOptions = new BehaviorSubject<boolean>(false);

  constructor(
    public optionsService: OptionsService,
    private _facade: OptionsFacade,
    private _formBuilder: FormBuilder,
  ) {
    this.enableOptions$.subscribe(this._enableOptions);
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group( this.optionsService.formControls );
  }

  ngAfterViewInit(): void {
    this._enableOptions.subscribe(enable => this.disable(!enable));
    this.loggedIn$.subscribe(loggedIn => this.reset(loggedIn));
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }
  
  public disable(isDisabled: boolean): void {
    (isDisabled) ? 
      this.form.disable() : 
      this.form.enable();
    this._mirrorCheckbox.disable(isDisabled); // disable mirror icon
  }

  // Resets options to user settings on login,
  // resets options to defaults on logout
  public reset(isLoggedIn: boolean): void {
    // Get settings
    let settings: any = isLoggedIn ? 
      firstValueFrom( this._facade.settings$ ) :
      new Promise ( () => defaultSettings );

    settings.then((settings: any) => {
      // Update form
      this.optionsService.reset(settings);
      // Reset mirror icon
      this._mirrorCheckbox.clicked(settings.knitSide);
    });
  }
}