import type { CompareFn, FilterFn } from './types'
import mutable from './arrayset-mutable.js'

const contains = <T>(a: T[], x: T | FilterFn<T>) =>
  typeof x === 'function' ? a.some(x as FilterFn<T>) : a.includes(x)

const add = <T>(a: T[], x: T) => (contains(a, x) ? a : [...a, x])

const remove = <T>(a: T[], x: T | FilterFn<T>) => {
  const idx = typeof x === 'function' ? a.findIndex(x as FilterFn<T>) : a.indexOf(x)
  if (idx >= 0) {
    a = a.slice()
    a.splice(idx, 1)
  }
  return a
}

const union = <T>(a: T[], b: T[], compare?: CompareFn<T>) => {
  return compare
    ? a.concat(b.filter(x => !a.some(y => compare(x, y) === 0)))
    : a.concat(b.filter(x => !a.includes(x)))
}

const intersection = <T>(a: T[], b: T[], compare?: CompareFn<T>) => {
  return compare ? a.filter(x => b.some(y => compare(x, y) === 0)) : a.filter(x => b.includes(x))
}

const minus = <T>(a: T[], b: T[], compare?: CompareFn<T>) => {
  return compare ? a.filter(x => !b.some(y => compare(x, y) === 0)) : a.filter(x => !b.includes(x))
}

const fromArray = <T>(a: T[]) => Array.from(new Set(a))

const arrayset = <T>(a: T[]) => ({
  contains: (x: T) => contains(a, x),
  add: (x: T) => add(a, x),
  remove: (x: T) => remove(a, x),
  union: (b: T[], compare?: CompareFn<T>) => union(a, b, compare),
  intersection: (b: T[], compare?: CompareFn<T>) => intersection(a, b, compare),
  minus: (b: T[], compare?: CompareFn<T>) => minus(a, b, compare),
  difference: (b: T[], compare?: CompareFn<T>) => minus(a, b, compare), // alias
})

arrayset.fromArray = fromArray
arrayset.mutable = mutable

export default arrayset
