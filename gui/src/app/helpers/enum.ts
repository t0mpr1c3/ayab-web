export function enumCount(enumName: any): number {
  let count = 0;
  for (let item in enumName) {
      if (isNaN(Number(item))) {
        count++;
      }
  }
  return count;
}

export function enumArray(enumName: any): string[] {
  let count = enumCount(enumName);
  let keys = Array.from(Array(count).keys());
  return keys.map(key => pretty(enumName[key]));
}

function pretty(str: string): string {
  return str
    .replace(re1, ', ')
    .replace(re2, ' ')
    .replace(re3, ':');
}
const re1 = new RegExp('(?<=[0-9])_', 'g');
const re2 = new RegExp('_', 'g');
const re3 = new RegExp('\\$', 'g');
/*
export function enumString(enumName: any): string {
  return JSON.stringify(enumArray(enumName));
}
*/