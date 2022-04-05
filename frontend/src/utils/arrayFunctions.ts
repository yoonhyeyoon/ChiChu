/** 배열이 비어있는지 체크하는 함수 */
export const isEmpty = <T>(arr: Array<T>) =>
  Array.isArray(arr) && arr.length === 0;
// function isEmpty<T>(arr: Array<T>): boolean {
//   return Array.isArray(arr) && arr.length === 0;
// }

export const range = (length: number): number[] =>
  Array.from(Array(length).keys());
