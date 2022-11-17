export type ObjectKey = string | number | symbol
export type Primitive = string | number | boolean | symbol | bigint
export type PrimitivesObject<K extends ObjectKey = ObjectKey> = Record<K, Primitive>
export type AnyPrimitive<K extends ObjectKey = ObjectKey> = Primitive | PrimitivesObject<K>

export function getAllIndexes<T = AnyPrimitive>(array: Array<T>, value: T): Array<number>
export function getAllIndexes<T = AnyPrimitive>(array: Array<T>, value: (item: T) => boolean): Array<number>
export function getAllIndexes<T = AnyPrimitive>(array: Array<T>, value: T) {
  const indexes = []
  let i = -1
  
  for (i = 0; i < array.length; i++) {
    if (typeof value === 'function' ? value(array[i]) : value) {
      indexes.push(i)
    }
  }
  
  return indexes
}

export function setValueFromIndexes<T = AnyPrimitive>(array: Array<T>, indexes: Array<number>, value: T): void
export function setValueFromIndexes<T = AnyPrimitive>(array: Array<T>, indexes: Array<number>, value: (item: T) => T): void
export function setValueFromIndexes<T = AnyPrimitive>(array: Array<T>, indexes: Array<number>, value: T) {
  let i = -1;
  
  for (i = 0; i < array.length; i++) {
    if (indexes.indexOf(i) !== -1) {
      array[i] = typeof value === 'function' ? value(array[i]) : value;
    }
  }

  return;
}