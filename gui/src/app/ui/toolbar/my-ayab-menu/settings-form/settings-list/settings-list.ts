import { Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingTemplateDirective } from "../settings-template.directive";

/** 
 * @title Settings list
 **/
@Component({
  standalone: true,
  selector: 'settings-list',
  templateUrl: 'settings-list.html',
  imports: [
    CommonModule,
    SettingTemplateDirective,
  ],
})
export class SettingsList<T extends object> {
  @Input() data!: T[];
  @ContentChild(SettingTemplateDirective, { read: TemplateRef }) settingTemplate!: TemplateRef<any>;
}