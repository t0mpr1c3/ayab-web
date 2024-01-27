import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import SettingTemplateDirective from './settings-template.directive';

/** 
 * @title Settings list component
 **/
@Component({
  selector: 'settings-list',
  template: `
    <div *ngFor="let setting of data">
      <ng-container *ngTemplateOutlet="settingTemplate; context: { $implicit: setting }"></ng-container>
    </div>`
})
export default class SettingsListComponent<T extends object> {
  @Input() data!: T[];
  @ContentChild(SettingTemplateDirective, { read: TemplateRef }) settingTemplate!: TemplateRef<any>;
}