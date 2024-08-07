# arrayset

A dependency-free library for treating arrays like sets and performing [set operations](<https://en.wikipedia.org/wiki/Set_(mathematics)#Basic_operations>) with an intuitive interface.

This library also includes a mutable version (ideal for use with [Automerge](https://github.com/automerge/automerge) or [Immer](https://github.com/immerjs/immer)).

## Notes

- arrayset is now an ESM-only library; if you need CommonJS, use version 1.0.11 (versions 1.0.12 and 1.0.13 are broken). No, you won't have TypeScript types, but...you should really be using ESM!
- arrayset will not itself introduce duplicates with any of its operations; however, it will not police the arrays you provide to remove duplicates.
- arrayset does not guarantee the order of elements after set operations.
- arrayset does not check arguments; make sure you're using it correctly!
- arrayset supports providing comparison functions for use with objects, but this has not been tested or documented.

## Normal (immutable) usage

```javascript
import set from 'arraysetjs'

// existence:

set([1, 2, 3]).contains(2) // true
set([1, 2, 3]).contains(4) // false

// add/remove elements:

set([1, 2, 3]).add(4) // [1, 2, 3, 4]
set([1, 2, 3]).remove(2) // [1, 3]

// union:

set([1, 2, 3]).union([4, 5, 6]) // [1, 2, 3, 4, 5, 6]
set([1, 2, 3]).union([3, 4, 5]) // [1, 2, 3, 4, 5]

// intersection:

set([1, 2, 3]).intersection([4, 5, 6]) // []
set([1, 2, 3]).intersection([3, 4, 5]) // [3]

// difference:

set([1, 2, 3]).minus([1, 3]) // [2]

// create an arrayset instance:

set.fromArray([1, 2, 3, 2, 3]) // [1, 2, 3]
```

## Mutable usage

The interface for mutable usage is exactly the same except the source array is modified. For example:

```javascript
import set from 'arraysetjs'

const a = [1, 2, 3]
set.mutable(a).union([3, 4]) // a is now [1, 2, 3, 4]
// (which is also returned)
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
