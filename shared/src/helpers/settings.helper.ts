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
}