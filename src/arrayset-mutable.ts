import type { CompareFn, FilterFn } from "./types";

const contains = <T>(a: T[], x: T | FilterFn<T>) =>
  typeof x === "function" ? a.some(x as FilterFn<T>) : a.includes(x);

const add = <T>(a: T[], x: T) => {
  if (!contains(a, x)) a.push(x);
  return a;
};

const remove = <T>(a: T[], x: T | FilterFn<T>) => {
  const idx = typeof x === "function" ? a.findIndex(x as FilterFn<T>) : a.indexOf(x);
  if (idx >= 0) a.splice(idx, 1);
  return a;
};

const union = <T>(a: T[], b: T[], compare?: CompareFn<T>) => {
  if (compare) a.push(...b.filter((x) => !a.some((y) => compare(x, y) === 0)));
  else a.push(...b.filter((x) => !a.includes(x)));
  return a;
};

const intersection = <T>(a: T[], b: T[], compare?: CompareFn<T>) => {
  for (let i = a.length - 1; i >= 0; i--) {
    if ((compare && !b.some((x) => compare(x, a[i]) === 0)) || !b.includes(a[i])) a.splice(i, 1);
  }
  return a;
};

const minus = <T>(a: T[], b: T[], compare?: CompareFn<T>) => {
  for (let i = a.length - 1; i >= 0; i--) {
    if ((compare && b.some((x) => compare(x, a[i]) === 0)) || b.includes(a[i])) a.splice(i, 1);
  }
  return a;
};

export default <T>(a: T[]) => ({
  contains: (x: T) => contains(a, x),
  add: (x: T) => add(a, x),
  remove: (x: T) => remove(a, x),
  union: (b: T[], compare?: CompareFn<T>) => union(a, b, compare),
  intersection: (b: T[], compare?: CompareFn<T>) => intersection(a, b, compare),
  minus: (b: T[], compare?: CompareFn<T>) => minus(a, b, compare),
  difference: (b: T[], compare?: CompareFn<T>) => minus(a, b, compare),
});
