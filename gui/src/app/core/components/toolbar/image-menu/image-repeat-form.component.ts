import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import Transforms from '../../../helpers/transforms.helper';
import { CancelService } from '../../../services/cancel.service';
import { CoreFacade } from '../../../facade/core.facade';
import { GenericButtonComponent } from '../../generic-button/generic-button.component';

@Component({
  standalone: true,
  templateUrl: 'xy-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    GenericButtonComponent,
  ],
  providers: [CoreFacade],
})
export class ImageRepeatFormComponent implements OnInit {
  public form: FormGroup;
  private _debounce = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cancelService: CancelService,
    private _facade: CoreFacade,
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      x: [1, []],
      y: [1, []],
    });
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }

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
    this._facade.transform( Transforms.repeat(
      this.f.x?.value, 
      this.f.y?.value,
    ));

    // Close dialog
    this._cancelService.emit();
  }
}