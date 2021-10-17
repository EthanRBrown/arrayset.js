import { CompareFn } from './types'

const contains = (a: unknown[], x: any) => typeof x === 'function' ? a.some(x) : a.includes(x)
const add = (a: unknown[], x: any) => {
  if(!contains(a, x)) a.push(x)
  return a
}
const remove = (a: unknown[], x: any) => {
  const idx = typeof x === 'function' ? a.findIndex(x) : a.indexOf(x)
  if(idx >= 0) a.splice(idx, 1)
  return a
}
const union = (a: unknown[], b: unknown[], compare?: CompareFn) => {
  if(compare)
    a.push(...b.filter(x => !a.some(y => compare(x, y) === 0)))
  else
    a.push(...b.filter(x => !a.includes(x)))
  return a
}
const intersection = (a: unknown[], b: unknown[], compare?: CompareFn) => {
  for(let i=a.length-1; i>=0; i--) {
    if(compare && !b.some(x => compare(x, a[i]) === 0) || !b.includes(a[i])) a.splice(i, 1)
  }
  return a
}
const minus = (a: unknown[], b: unknown[], compare?: CompareFn) => {
  for(let i=a.length-1; i>=0; i--) {
    if(compare && b.some(x => compare(x, a[i]) === 0) || b.includes(a[i])) a.splice(i, 1)
  }
  return a
}

export default (a: unknown[]) => ({
  contains: (x: any) => contains(a, x),
  add: (x: any) => add(a, x),
  remove: (x: any) => remove(a, x),
  union: (b: unknown[], compare?: CompareFn) => union(a, b, compare),
  intersection: (b: unknown[], compare?: CompareFn) => intersection(a, b, compare),
  minus: (b: unknown[], compare?: CompareFn) => minus(a, b, compare),
  difference: (b: unknown[], compare?: CompareFn) => minus(a, b, compare),
})
