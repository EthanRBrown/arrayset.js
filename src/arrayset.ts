import mutable from './arrayset-mutable'
import { CompareFn } from './types'

const contains = (a: unknown[], x: any) => typeof x === 'function' ? a.some(x) : a.includes(x)
const add = (a: unknown[], x: any) => contains(a, x) ? a : [...a, x]
const remove = (a: unknown[], x: any) => {
  const idx = typeof x === 'function' ? a.findIndex(x) : a.indexOf(x)
  if(idx >= 0) {
    a = a.slice()
    a.splice(idx, 1)
  }
  return a
}
const union = (a: unknown[], b: unknown[], compare?: CompareFn) => {
  return compare
    ? a.concat(b.filter(x => !a.some(y => compare(x, y) === 0)))
    : a.concat(b.filter(x => !a.includes(x)))
}
const intersection = (a: unknown[], b: unknown[], compare?: CompareFn) => {
  return compare
    ? a.filter(x => b.some(y => compare(x, y) === 0))
    : a.filter(x => b.includes(x))
}
const minus = (a: unknown[], b: unknown[], compare?: CompareFn) => {
  return compare
    ? a.filter(x => !b.some(y => compare(x, y) === 0))
    : a.filter(x => !b.includes(x))
}
const fromArray = (a: unknown[]) => Array.from(new Set(a))

const arrayset = (a: unknown[]) => ({
  contains: (x: any) => contains(a, x),
  add: (x: any) => add(a, x),
  remove: (x: any) => remove(a, x),
  union: (b: unknown[], compare?: CompareFn) => union(a, b, compare),
  intersection: (b: unknown[], compare?: CompareFn) => intersection(a, b, compare),
  minus: (b: unknown[], compare?: CompareFn) => minus(a, b, compare),
  difference: (b: unknown[], compare?: CompareFn) => minus(a, b, compare),   // alias
})

arrayset.fromArray = fromArray
arrayset.mutable = mutable

export default arrayset
