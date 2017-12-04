const test = require('ava')

const {
  isCore,
  isSystem,
  isThemed,
  corePropList
} = require('../lib/templates/system')

test('isCore returns true for a core prop', t => t.true(isCore('w')))
test('isCore returns false when not a core prop', t => t.false(isCore('boxShadow')))

test('isThemed returns true for themed props', t => t.true(isThemed('color')))
test('isThemed returns false for unthemed props', t => t.false(isThemed('align')))

test('isSystem returns true for system props', t => t.true(isSystem('align')))
test('isSystem returns false when not a system prop', t => t.false(isSystem('foo')))

test('corePropList returns core props', t => t.snapshot(corePropList))
