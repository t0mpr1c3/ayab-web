import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import Transforms from '../../../helpers/transforms.helper';
import { CancelService } from '../../../services/cancel.service';
import { CoreFacade } from '../../../facade/core.facade';
import { GenericButtonComponent } from '../../generic-button/generic-button.component';

@Component({
  standalone: true,
  templateUrl: 'image-reflect-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    GenericButtonComponent,
  ],
  providers: [CoreFacade],
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
    private _facade: CoreFacade,
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