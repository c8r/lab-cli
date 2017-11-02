import test from 'ava'
import createModules from '../lib'

const config = [
  {
    name: 'Box',
    type: 'div',
    props: {},
    style: {}
  },
  {
    name: 'Text',
    type: 'p',
    props: {
      m: 0
    },
    style: {}
  },
  {
    name: 'Hello',
    imports: ['Box', 'Text'],
    jsx: '<Box><Text /></Box>'
  },
  {
    name: 'Beep',
    type: 'Box',
    props: {
      p: 3,
      bg: 'tomato'
    },
    style: {}
  },
  {
    name: 'Flex',
    type: 'Box',
    props: {},
    style: {
      display: 'flex'
    },
    system: ['alignItems', 'justifyContent', 'flexDirection', 'flexWrap']
  }
]

test('returns an array of objects', t => {
  const mods = createModules(config)
  t.true(Array.isArray(mods))
  const [a, b, c, d, e, f] = mods
  t.is(typeof a, 'object')
  t.is(typeof b, 'object')
  t.is(typeof c, 'object')
  t.is(typeof d, 'object')
  t.is(typeof e, 'object')
  t.is(typeof f, 'object')
  t.is(a.name, 'index')
  t.is(b.name, 'Box')
  t.is(c.name, 'Text')
  t.is(d.name, 'Hello')
  t.is(e.name, 'Beep')
  t.is(f.name, 'Flex')
  t.is(typeof a.module, 'string')
  t.is(typeof b.module, 'string')
  t.is(typeof c.module, 'string')
  t.is(typeof d.module, 'string')
  t.is(typeof e.module, 'string')
  t.is(typeof f.module, 'string')
  t.snapshot(a)
  t.snapshot(b)
  t.snapshot(c)
  t.snapshot(d)
  t.snapshot(e)
  t.snapshot(f)
})

test('accepts a library option', t => {
  const mods = createModules(config, {
    library: 'glamorous'
  })
  const [a, b] = mods
  t.is(typeof a, 'object')
  t.is(typeof b, 'object')
  t.snapshot(a)
  t.snapshot(b)
})

test('accepts a custom template option', t => {
  const template = () => `module.exports = 'hello'`
  const [ a, b ] = createModules(config, {
    harmony: true,
    template
  })
  t.is(b.module.trim(), `module.exports = 'hello'`)
})

test('accepts atomic template option', t => {
  const out = createModules(config, {
    library: 'atomic',
    theme: {}
  })
  t.snapshot(out)
})
