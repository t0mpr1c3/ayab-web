import { Setting, settings } from "../models/settings.model";

type KV<T> = {
  key: string;
  value: T;
}
export default class SettingsHelper {

  static reduce<T>(array: KV<T>[]) {
    return array.reduce((pre, element) => ({
      ...pre,
      [element.key]: element.value,
    }), {});
  }

  static mapSettings<T>(func: (setting: Setting) => T): T[] {
    return Array
      .from(Array(settings.length).keys())
      .map(idx => {
        let setting: Setting = settings[idx]!;
        return func(setting);
      })
  }
}