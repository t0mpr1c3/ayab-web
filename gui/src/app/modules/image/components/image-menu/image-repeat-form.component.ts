import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import CancelService from '../../../shared/services/cancel.service';
import ImageFacade from '../../facade/image.facade';

/** 
 * @title Image repeat form component
 **/
@Component({
  templateUrl: 'scale-form.component.html',
  host: { transform: 'repeat' },
  providers: [ImageFacade],
})
export default class ImageRepeatFormComponent implements OnInit {
  public form: FormGroup;
  private _debounce = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cancelService: CancelService,
    private _facade: ImageFacade,
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
    this._facade.repeatImage({
      x: this.f.x?.value, 
      y: this.f.y?.value,
    });

    // Close dialog
    this._cancelService.emit();
  }
}