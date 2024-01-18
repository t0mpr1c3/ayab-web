import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { mapSettings, reduce } from '../../../../../../shared/src/helpers/reduce';
import { getUser } from '../../../auth/helpers/local-storage';
import { CancelService } from '../../../core/services/cancel.service';
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
  selector: '',
  templateUrl: 'settings-form.component.html',
  styleUrls: ['settings-form.component.css'],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule,
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
  private _user: User;
  private _userSettings: Settings;
  private _debounce: Boolean = false;

  public constructor(
    private _formBuilder: FormBuilder,
    private _cancelService: CancelService,
    private _facade: ProfileFacade,
  ) {}

  ngOnInit(): void {
    // Get user settings
    this._user = getUser()!;
    this._userSettings = this._user.settings;

    // Create form controls
    this.formControls = reduce(
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

  public onSubmit() {
    if (this._debounce) {
      return;
    }
    this._debounce = true;

    // Update user settings
    this._user.settings = reduce(
      mapSettings(setting => ({
        key: setting.key,
        value: this.formControls[setting.key]!.value,
      }))
    );
      
    // Return updated user data
    this._facade.update(this._user);

    // Close dialog
    this._cancelService.emit();
  }
  /*
    public onReset() {
      this.form.reset();
    }
  */
  public onCancel() {
    this._debounce = true;
    this._cancelService.emit();
  }
}