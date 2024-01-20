import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { CoreFacade } from "../../../core/facade/core.facade";
import EnumHelper from "../../../../../../../shared/src/helpers/enum.helper";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { ModeEnum } from "../../../../../../../shared/src/models/mode-enum.model";
import { AlignmentEnum } from "../../../../../../../shared/src/models/alignment-enum.model";
import { ColorEnum } from "../../../../../../../shared/src/models/color-enum.model";
import { TSetting, defaultSettings } from "../../../../../../../shared/src/models/settings.model";
import { MirrorCheckboxComponent } from "../mirror-checkbox/mirror-checkbox.component";

// FIXME options panel is missing infinite repeat checkbox

/**
 * @title Options panel component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'options-panel',
  templateUrl: 'options-panel.component.html',
  styleUrls: ['options-panel.component.css'],
  providers: [CoreFacade],
})
export class OptionsPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('mirrorCheckbox') private _mirrorCheckbox: MirrorCheckboxComponent;

  public alignmentEnum = EnumHelper.enumArray(AlignmentEnum);
  public disabled: boolean;
  public enableOptions$ = this._facade.enableOptions$;
  public form: FormGroup;
  public formControls: Record<string, FormControl<TSetting>>;
  public loggedIn$ = this._facade.loggedIn$;
  public modeEnum = EnumHelper.enumArray(ModeEnum);
  private _enableOptions = new BehaviorSubject<boolean>(false);

  constructor(
    private _facade: CoreFacade,
    private _formBuilder: FormBuilder,    
    private _localStorageService: LocalStorageService,
  ) {
    this.enableOptions$.subscribe(this._enableOptions);
  }

  ngOnInit(): void {
    this.formControls = {
      mode: new FormControl<ModeEnum>(ModeEnum.Single_Bed, { nonNullable: true }),
      colors: new FormControl<number>(2, { nonNullable: true }),
      row: new FormControl<number>(1, { nonNullable: true }),
      infRepeat: new FormControl<boolean>(false, { nonNullable: true }),
      startNeedle: new FormControl<number>(1, { nonNullable: true }),
      startColor: new FormControl<ColorEnum>(0, { nonNullable: true }),
      stopNeedle: new FormControl<number>(1, { nonNullable: true }),
      stopColor: new FormControl<ColorEnum>(1, { nonNullable: true }),
      alignment: new FormControl<AlignmentEnum>(AlignmentEnum.Center, { nonNullable: true }),
      mirror: new FormControl<boolean>(false, { nonNullable: true }),
    };
    this.form = this._formBuilder.group(
      this.formControls
    );
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
    let s = isLoggedIn ? 
      this._localStorageService.getUser()!.settings as any :
      defaultSettings as any;
    this.formControls.mode!.setValue(s.mode);
    this.formControls.infRepeat!.setValue(s.infRepeat);
    this.formControls.alignment!.setValue(s.alignment);
    this.formControls.mirror!.setValue(s.knitSide);
    this._mirrorCheckbox.clicked(s.knitSide); // reset mirror icon
  }
}