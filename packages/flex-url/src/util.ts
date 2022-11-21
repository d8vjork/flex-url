/* eslint-disable @typescript-eslint/unified-signatures */
export type ObjectKey = string | number | symbol;
export type Primitive = string | number | boolean | symbol | bigint;
export type PrimitivesObject<K extends ObjectKey = ObjectKey> = Record<K, Primitive>;
export type AnyPrimitive<K extends ObjectKey = ObjectKey> = Primitive | PrimitivesObject<K>;

export function getAllIndexes<T = AnyPrimitive>(array: T[], value: T): number[];
export function getAllIndexes<T = AnyPrimitive>(array: T[], value: (item: T) => boolean): number[];
export function getAllIndexes<T = AnyPrimitive>(array: T[], value: T) {
  const indexes: number[] = [];
  let i = -1;

  for (i = 0; i < array.length; i++) {
    if (typeof value === 'function' ? value(array[i]) : value) {
      indexes.push(i);
    }
  }

  return indexes;
}

export function setValueFromIndexes<T = AnyPrimitive>(array: T[], indexes: number[], value: T): void;
export function setValueFromIndexes<T = AnyPrimitive>(array: T[], indexes: number[], value: (item: T) => T): void;
export function setValueFromIndexes<T = AnyPrimitive>(array: T[], indexes: number[], value: T) {
  let i = -1;

  for (i = 0; i < array.length; i++) {
    if (indexes.includes(i)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      array[i] = typeof value === 'function' ? value(array[i]) : value;
    }
  }
}
