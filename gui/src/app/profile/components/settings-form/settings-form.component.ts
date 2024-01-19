import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import SettingsHelper from '../../../../../../shared/src/helpers/settings.helper';
import { CancelService } from '../../../core/services/cancel.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ProfileFacade } from '../../facade/profile.facade';
import { Settings, TSetting } from '../../../../../../shared/src/models/settings.model';
import { User } from '../../../../../../shared/src/models/user.model';
import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';
import { GenericCheckboxComponent } from '../../../core/components/generic-checkbox/generic-checkbox.component';
import { GenericSelectComponent } from '../../../core/components/generic-select/generic-select.component';
import { SettingTemplateDirective } from './settings-template.directive';
import { SettingsListComponent } from './settings-list/settings-list.component';

/** 
 * @title Settings form 
 **/
@Component({
  standalone: true,
  templateUrl: 'settings-form.component.html',
  styleUrls: ['settings-form.component.css'],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    GenericButtonComponent,
    GenericCheckboxComponent,
    GenericSelectComponent,
    SettingsListComponent,
    SettingTemplateDirective,
  ],
  providers: [ProfileFacade],
})
export class SettingsFormComponent implements OnInit {
  public form!: FormGroup;
  public formControls: Record<string, FormControl<TSetting>>;
  public settingsData: { 
    key: string, 
    name: string, 
    value: TSetting, 
    enum?: string[], 
    control: FormControl<TSetting>,
  }[];
  private _debounce: Boolean = false;
  private _user: User;
  private _userSettings: Settings;

  public constructor(
    private _cancelService: CancelService,
    private _facade: ProfileFacade,
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    // Get user settings
    this._user = this._localStorageService.getUser()!;
    this._userSettings = this._user.settings;

    // Create form controls
    this.formControls = SettingsHelper.reduce(
      SettingsHelper.mapSettings(setting => ({
        key: setting.key,
        value: new FormControl<TSetting>(
          this._userSettings[setting.key as keyof Settings]
        )
      }))
    );

    // Create form group
    this.form = this._formBuilder.group(
      this.formControls
    );

    // Make dataset to generate form inputs
    this.settingsData = SettingsHelper.mapSettings(setting => ({
      key: setting.key,
      name: setting.title,
      value: this._userSettings[setting.key as keyof Settings],
      enum: setting.enum,
      control: this.formControls[setting.key]!,
    }));
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }
  public onCancel() {
    this._debounce = true;
    this._cancelService.emit();
  }

  /*
    public onReset() {
      this.form.reset();
    }
  */
 
  public onSubmit() {
    if (this._debounce) {
      return;
    }
    this._debounce = true;

    // Update user settings
    this._user.settings = SettingsHelper.reduce(
      SettingsHelper.mapSettings(setting => ({
        key: setting.key,
        value: this.formControls[setting.key]!.value,
      }))
    );
      
    // Return updated user data
    this._facade.updateSettings(this._user.settings);

    // Close dialog
    this._cancelService.emit();
  }
}