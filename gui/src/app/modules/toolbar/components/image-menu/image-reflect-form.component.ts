import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import Transforms from '../../../image/helpers/transforms.helper';
import { CancelService } from '../../../shared/services/cancel.service';
import { ToolbarFacade } from '../../facade/toolbar.facade';

/** 
 * @title Image reflect form component
 **/
@Component({
  templateUrl: 'image-reflect-form.component.html',
  providers: [ToolbarFacade],
})
export class ImageReflectFormComponent implements OnInit {
  public form: FormGroup;
  public formControls: Record<string, FormControl<boolean|null>>;
  public left: boolean = false;
  public right: boolean = false;
  public top: boolean = false;
  public bottom: boolean = false;
  private _debounce = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cancelService: CancelService,
    private _facade: ToolbarFacade,
  ) {}

  ngOnInit() {
    this.formControls = {
      left: new FormControl<boolean>(false),
      right: new FormControl<boolean>(false),
      top: new FormControl<boolean>(false),
      bottom: new FormControl<boolean>(false),
    };
    this.form = this._formBuilder.group(this.formControls);
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }

  public onLeft(_: MatCheckboxChange) {}
  public onRight(_: MatCheckboxChange) {}
  public onTop(_: MatCheckboxChange) {}
  public onBottom(_: MatCheckboxChange) {}

  public onCancel(): void {
    this._debounce = true;
    this._cancelService.emit();
  }

  public onSubmit(): void {
    if (this._debounce) {
      return;
    }
    this._debounce = true;
      
    // Transform image
    this._facade.transform( Transforms.reflect(
      this.f.left?.value, 
      this.f.right?.value,
      this.f.top?.value, 
      this.f.bottom?.value,
    ));

    // Close dialog
    this._cancelService.emit();
  }
}