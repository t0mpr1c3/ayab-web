import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import SettingsHelper from '../../../../../../../shared/src/helpers/settings.helper';
import CancelService from '../../../shared/services/cancel.service';
import LocalStorageService from '../../../shared/services/local-storage.service';
import SettingsFacade from '../../facade/settings.facade';
import { Settings, TSetting, mapSettings } from '../../../../../../../shared/src/models/settings.model';
import User from '../../../../../../../shared/src/models/user.model';

// FIXME add setting for language locale

/** 
 * @title Settings form component
 **/
@Component({
  templateUrl: 'settings-form.component.html',
  styleUrls: ['settings-form.component.css'],
  providers: [SettingsFacade],
})
export default class SettingsFormComponent implements OnInit {
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
    private _facade: SettingsFacade,
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    // Get user settings
    this._user = this._localStorageService.user!;
    this._userSettings = this._user.settings;

    // Create form controls
    this.formControls = SettingsHelper.reduce(
      mapSettings(setting => ({
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
    this.settingsData = mapSettings(setting => ({
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
    if (this._debounce) return;
    this._debounce = true;

    // Update user settings
    this._user.settings = SettingsHelper.reduce(
      mapSettings(setting => ({
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