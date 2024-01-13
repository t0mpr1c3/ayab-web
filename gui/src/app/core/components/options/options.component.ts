import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BehaviorSubject, Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as root from '../../../reducers';

import { ImageLoadedService } from '../../../core/services/image-loaded.service';
import { enumArray } from "../../helpers/enum";
import { isLoggedIn } from "../../services/auth/helpers/auth";
import { ModeEnum } from "../../../../../../shared/src/models/mode-enum.model";
import { AlignmentEnum } from "../../../../../../shared/src/models/alignment-enum.model";
import { TSetting } from "../../../../../../shared/src/models/settings.model";
import { GenericSelect } from "../generic-select/generic-select.component";
import { PortSelect } from "./port-select/port-select.component";
import { RowInput } from "./row-input/row-input.component";
import { ColorsInput } from "./colors-input/colors-input.component";
import { NeedleInput } from "./needle-input/needle-input.component";
import { MirrorCheckbox } from "./mirror-checkbox/mirror-checkbox.component";
import { MatSelectModule } from "@angular/material/select";

/**
 * @title Options panel
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
    CommonModule,
    PortSelect,
    RowInput, 
    ColorsInput, 
    NeedleInput, 
    GenericSelect, 
    MirrorCheckbox,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class OptionsPanel implements OnInit, AfterViewInit {  
  @ViewChild('mirrorCheckbox') private _mirrorCheckbox: MirrorCheckbox;

  public form: FormGroup;
  public formControls: Record<string, FormControl<TSetting>>;
  public modeEnum = enumArray(ModeEnum);
  public alignmentEnum = enumArray(AlignmentEnum);
  private _enableOptions = new BehaviorSubject<boolean>(false);
  public enableOptions$: Observable<boolean>;

  public mode: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<root.State>,
    private _imageLoadedService: ImageLoadedService,
  ) {
    this.enableOptions$ = this._store.select(root.selectEnableOptions);
    this.enableOptions$.subscribe(this._enableOptions);
  }

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
      this.formControls
    );
    this._imageLoadedService.imageLoaded$.subscribe(() => {
      this.disable(false);
    })
  }

  ngAfterViewInit(): void {
    this.disable(!this._enableOptions.getValue());
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }
  
  public disable(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
    this._mirrorCheckbox.disable(isDisabled);
  }

  public reset() {
    if (isLoggedIn()) {
      // Set form defaults to preferences
    } else {
      // Set form defaults to defaultSettings
    }
  }
}