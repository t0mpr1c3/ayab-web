import { Directive, Input } from '@angular/core';

/** 
 * @title Settings template directive
 **/
@Directive({
  selector: 'ng-template[appSetting]',
})
export class SettingTemplateDirective<T extends object> {
  @Input('appSetting') data!: T[];

  public $implicit: T;

  constructor() {}

  // constrains type of ngTemplateOutlet in 'settings-list.html'
  // https://levelup.gitconnected.com/strongly-typed-ngtemplateoutlet-3a3b55057e50
  static ngTemplateContextGuard<T_ extends object>(
    // @ts-ignore
    directive: SettingTemplateDirective<T_>,
    // @ts-ignore
    context: unknown
  ): context is SettingTemplateDirective<T_> {
    return true;
  }
}