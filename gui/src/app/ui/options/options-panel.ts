import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Observable, Subscription } from "rxjs";

import { enumArray } from "../../helpers/enum";
import { isLoggedIn } from "../../helpers/auth";
import { ModeEnum } from "../../models/ModeEnum";
import { AlignmentEnum } from "../../models/AlignmentEnum";
import { TSetting } from "../../models/Settings";
import { OptionsVisibilityService } from "../../services/optionsVisibility.service";
import { OptionsAvailabilityService } from "../../services/optionsAvailability.service";
import { GenericSelect } from "../generic-select/generic-select";
import { PortSelect } from "./port-select/port-select";
import { RowInput } from "./row-input/row-input";
import { ColorsInput } from "./colors-input/colors-input";
import { NeedleInput } from "./needle-input/needle-input";
import { MirrorCheckbox } from "./mirror-checkbox/mirror-checkbox";

/**
 * @title Options panel
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'options-panel',
  templateUrl: 'options-panel.html',
  styleUrls: ['options-panel.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PortSelect,
    RowInput, 
    ColorsInput, 
    NeedleInput, 
    GenericSelect, 
    MirrorCheckbox,
    MatIconModule,
    MatButtonModule,
  ]
})
export class OptionsPanel implements OnInit, OnDestroy {
  public form: FormGroup;
  public formControls: Record<string, FormControl<TSetting>>;
  public modeEnum = enumArray(ModeEnum);
  public alignmentEnum = enumArray(AlignmentEnum);
  public visible$: Observable<boolean>;
  public enabled$: Observable<boolean>;
  private _visibilitySubscription: Subscription;
  private _availabilitySubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _visibilityService: OptionsVisibilityService,
    private _availabilityService: OptionsAvailabilityService,
    ) {}    

  ngOnInit(): void {
    this.formControls = {
      mode: new FormControl<ModeEnum>({ value: 0, disabled: true }, { nonNullable: true }),
      colors: new FormControl<number>({ value: 1, disabled: true }, { nonNullable: true }),
      row: new FormControl<number>({ value: 1, disabled: true }, { nonNullable: true }),
      start: new FormControl<number>({ value: -1, disabled: true }, { nonNullable: true }),
      stop: new FormControl<number>({ value: 1, disabled: true }, { nonNullable: true }),
      alignment: new FormControl<AlignmentEnum>({ value: 0, disabled: true }, { nonNullable: true }),
      mirror: new FormControl<boolean>({ value: false, disabled: true }, { nonNullable: true }),
    };
    this.form = this._formBuilder.group(
      //port: [],
      //mode: new FormControl<ModeEnum>(0, { nonNullable: false }),
      //colors: new FormControl<number>(1, { nonNullable: false }),
      //row: new FormControl<number>(1, { nonNullable: false }),
      //start: [],
      //stop: [],
      //alignment: new FormControl<AlignmentEnum>(0, { nonNullable: false }),
      this.formControls
    );
    this.visible$ = this._visibilityService.visible();
    this._visibilitySubscription = this.visible$.subscribe();
    this.enabled$ = this._availabilityService.available();
    this._availabilitySubscription = this.enabled$.subscribe(enabled => {
      if (enabled) {
        if (isLoggedIn()) {
          // Set form defaults to preferences
        } else {
          // Set form defaults to defaultSettings
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._availabilitySubscription.unsubscribe();
    this._visibilitySubscription.unsubscribe();
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }
  
  public hide() {
    this._visibilityService.hide();
  }
}