export function getRandom(list: Array<any>): any {
  return list[Math.floor(Math.random() * list.length)];
}

export function getMultipleRandom(arr: Array<any>, num: number): Array<any> {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function generateN(n: number, generator: () => object): Array<object> {
  return new Array(n).map(() => generator());
}
