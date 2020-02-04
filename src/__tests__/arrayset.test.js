const arrayset = require('../arrayset')

describe('immutable', () => {
  describe('contains', () => {
    test('positive', () => {
      expect(arrayset([7,8,6]).contains(8)).toBe(true)
    })

    test('negative', () => {
      expect(arrayset([7,5,8]).contains(4)).toBe(false)
    })

    test('empty', () => {
      expect(arrayset([]).contains(4)).toBe(false)
    })
  })

  describe('add', () => {
    test('to array', () => {
      expect(arrayset([8,3,9]).add(4).sort()).toEqual([3,4,8,9])
    })

    test('to empty array', () => {
      expect(arrayset([]).add(1)).toEqual([1])
    })
  })

  describe('remove', () => {
    test('existing', () => {
      expect(arrayset([5,1,6]).remove(1).sort()).toEqual([5,6])
    })

    test('empty', () => {
      expect(arrayset([]).remove(1)).toEqual([])
    })
  })

  describe('union', () => {
    test('overlap', () => {
      expect(arrayset([5,2,3]).union([6,2,3,7]).sort()).toEqual([2,3,5,6,7])
    })

    test('no overlap', () => {
      expect(arrayset([9,3,5]).union([2,8,4]).sort()).toEqual([2,3,4,5,8,9])
    })

    test('left empty', () => {
      expect(arrayset([]).union([5,6,7])).toEqual([5,6,7])
    })

    test('right empty', () => {
      expect(arrayset([1,2,3]).union([])).toEqual([1,2,3])
    })

    test('both empty', () => {
      expect(arrayset([]).union([])).toEqual([])
    })
  })

  describe('intersection', () => {
    test('overlap', () => {
      expect(arrayset([8,5,1]).intersection([5,9,1]).sort()).toEqual([1,5])
    })

    test('no overlap', () => {
      expect(arrayset([8,2,5]).intersection([9,1,4])).toEqual([])
    })

    test('left empty', () => {
      expect(arrayset([]).intersection([4,5,6])).toEqual([])
    })

    test('right empty', () => {
      expect(arrayset([1,2,3]).intersection([])).toEqual([])
    })
  })

  describe('minus', () => {
    test('overlap', () => {
      expect(arrayset([5,8,6]).minus([5,6]).sort()).toEqual([8])
    })

    test('left empty', () => {
      expect(arrayset([]).minus([2])).toEqual([])
    })

    test('right empty', () => {
      expect(arrayset([1,2,3]).minus([])).toEqual([1,2,3])
    })

    test('no overlap', () => {
      expect(arrayset([1,2,3]).minus([4])).toEqual([1,2,3])
    })
  })

  describe('fromArray', () => {
    test('empty', () => {
      expect(arrayset.fromArray([])).toEqual([])
    })

    test('no duplicates', () => {
      expect(arrayset.fromArray([1,3,2]).sort()).toEqual([1,2,3])
    })

    test('duplicates', () => {
      expect(arrayset.fromArray([1,1,3,2,3,2,1]).sort()).toEqual([1,2,3])
    })
  })
})

describe('mutable', () => {
  describe('contains', () => {
    test('positive', () => {
      expect(arrayset.mutable([7,8,6]).contains(8)).toBe(true)
    })

    test('negative', () => {
      expect(arrayset.mutable([7,5,8]).contains(4)).toBe(false)
    })

    test('empty', () => {
      expect(arrayset.mutable([]).contains(4)).toBe(false)
    })
  })

  describe('add', () => {
    test('to array', () => {
      const a = [8,3,9]
      arrayset.mutable(a).add(4).sort()
      expect(a).toEqual([3,4,8,9])
    })

    test('to empty array', () => {
      const a = []
      arrayset.mutable(a).add(1)
      expect(a).toEqual([1])
    })
  })

  describe('remove', () => {
    test('existing', () => {
      const a = [5,1,6]
      arrayset.mutable(a).remove(1).sort()
      expect(a).toEqual([5,6])
    })

    test('empty', () => {
      const a = []
      arrayset.mutable(a).remove(1)
      expect(a).toEqual([])
    })
  })

  describe('union', () => {
    test('overlap', () => {
      const a = [5,2,3]
      arrayset.mutable(a).union([6,2,3,7]).sort()
      expect(a).toEqual([2,3,5,6,7])
    })

    test('no overlap', () => {
      const a = [9,3,5]
      arrayset.mutable(a).union([2,8,4]).sort()
      expect(a).toEqual([2,3,4,5,8,9])
    })

    test('left empty', () => {
      const a = []
      arrayset.mutable(a).union([5,6,7])
      expect(a).toEqual([5,6,7])
    })

    test('right empty', () => {
      const a = [1,2,3]
      arrayset.mutable(a).union([])
      expect(a).toEqual([1,2,3])
    })

    test('both empty', () => {
      const a = []
      arrayset.mutable(a).union([])
      expect(a).toEqual([])
    })
  })

  describe('intersection', () => {
    test('overlap', () => {
      const a = [8,5,1]
      arrayset.mutable(a).intersection([5,9,1]).sort()
      expect(a).toEqual([1,5])
    })

    test('no overlap', () => {
      const a = [8,2,5]
      arrayset.mutable(a).intersection([9,1,4])
      expect(a).toEqual([])
    })

    test('left empty', () => {
      const a = []
      arrayset.mutable(a).intersection([4,5,6])
      expect(a).toEqual([])
    })

    test('right empty', () => {
      const a = [1,2,3]
      arrayset.mutable(a).intersection([])
      expect(a).toEqual([])
    })
  })

  describe('minus', () => {
    test('overlap', () => {
      const a = [5,8,6]
      arrayset.mutable(a).minus([5,6]).sort()
      expect(a).toEqual([8])
    })

    test('left empty', () => {
      const a = []
      arrayset.mutable(a).minus([2])
      expect(a).toEqual([])
    })

    test('right empty', () => {
      const a = [1,2,3]
      arrayset.mutable(a).minus([])
      expect(a).toEqual([1,2,3])
    })

    test('no overlap', () => {
      const a = [1,2,3]
      arrayset.mutable(a).minus([4])
      expect(a).toEqual([1,2,3])
    })
  })

  describe('fromArray', () => {
    test('empty', () => {
      const a = []
      arrayset.mutable.fromArray(a)
      expect(a).toEqual([])
    })

    test('no duplicates', () => {
      const a = [1, 3, 2]
      arrayset.mutable.fromArray([1,3,2])
      expect(a.sort()).toEqual([1,2,3])
    })

    test('duplicates', () => {
      const a = [5,3,4,4,3,5,1,1,3,8,5,3]
      arrayset.mutable.fromArray(a)
      expect(a.sort()).toEqual([1,3,4,5,8])
    })
  })
})
