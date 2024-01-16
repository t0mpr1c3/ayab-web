import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BehaviorSubject, Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../../reducers'

import { ImageLoadedService } from '../../../core/services/image-loaded.service';
import { enumArray } from "../../helpers/enum";
import { getUser, isLoggedIn } from "../../../auth/helpers/auth";
import { ModeEnum } from "../../../../../../shared/src/models/mode-enum.model";
import { AlignmentEnum } from "../../../../../../shared/src/models/alignment-enum.model";
import { TSetting, defaultSettings } from "../../../../../../shared/src/models/settings.model";
import { GenericSelectComponent } from "../generic-select/generic-select.component";
import { PortSelectComponent } from "./port-select/port-select.component";
import { RowInputComponent } from "./row-input/row-input.component";
import { ColorsInputComponent } from "./colors-input/colors-input.component";
import { NeedleInputComponent } from "./needle-input/needle-input.component";
import { MirrorCheckboxComponent } from "./mirror-checkbox/mirror-checkbox.component";

// FIXME options panel is missing infinite repeat checkbox

/**
 * @title Options panel component
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'options-panel',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    PortSelectComponent,
    RowInputComponent, 
    ColorsInputComponent, 
    NeedleInputComponent, 
    GenericSelectComponent, 
    MirrorCheckboxComponent,
  ]
})
export class OptionsPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('mirrorCheckbox') private _mirrorCheckbox: MirrorCheckboxComponent;

  public form: FormGroup;
  public formControls: Record<string, FormControl<TSetting>>;
  public modeEnum = enumArray(ModeEnum);
  public alignmentEnum = enumArray(AlignmentEnum);
  private _enableOptions = new BehaviorSubject<boolean>(false);
  public enableOptions$: Observable<boolean>;
  public disabled: boolean;

  public mode: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _imageLoadedService: ImageLoadedService,
    private _store: Store<fromRoot.State>,
  ) {
    this.enableOptions$ = this._store.select(fromRoot.selectEnableOptions);
    this.enableOptions$.subscribe(this._enableOptions);
  }

  ngOnInit(): void {
    this.formControls = {
      mode: new FormControl<ModeEnum>(0, { nonNullable: true }),
      colors: new FormControl<number>(2, { nonNullable: true }),
      row: new FormControl<number>(1, { nonNullable: true }),
      start: new FormControl<number>(-1, { nonNullable: true }),
      stop: new FormControl<number>(1, { nonNullable: true }),
      alignment: new FormControl<AlignmentEnum>(0, { nonNullable: true }),
      mirror: new FormControl<boolean>(false, { nonNullable: true }),
    };
    this.form = this._formBuilder.group(
      this.formControls
    );
    this._imageLoadedService.imageLoaded$.subscribe(() => {
      this.reset();
      this.disable(false);
    })
  }

  ngAfterViewInit(): void {
    this.disable(!this._enableOptions.getValue());
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }
  
  public disable(isDisabled: boolean): void {
    (isDisabled) ? 
      this.form.disable() : 
      this.form.enable();
    this._mirrorCheckbox.disable(isDisabled);
  }

  public reset() {
    let s = (isLoggedIn()) ? 
      getUser()!.settings as any :
      defaultSettings as any;
    this.formControls.mode!.setValue(s.mode);
    //this.formControls.infRepeat!.setValue(s.infRepeat);
    this.formControls.alignment!.setValue(s.alignment);
    this.formControls.mirror!.setValue(s.knitSide);
  }
}