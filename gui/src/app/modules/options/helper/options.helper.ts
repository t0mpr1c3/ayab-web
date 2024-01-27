export default class OptionsHelper {
  static parseNumberFromEvent(event: Event): number {
    return parseInt((event.target as HTMLInputElement).value);
  }
}