import test from 'ava'
import templates from '../lib/templates'

const config = {
  name: 'Hello',
  type: 'h2',
  extensionImport: '',
  systemFunctions: '',
  props: `{
  p: 2
}`,
  style: `(props, theme) => ({
  fontFamily: 'inherit',
  color: props.theme('colors.blue')
})`
}

const compConfig = {
  name: 'Box',
  type: 'Div',
  props: '{}',
  style: '{}',
  extensionImport: `import Div from './Div'`,
  systemFunctions: ''
}

test('styled-components returns a string', t => {
  const a = templates['styled-components'](config)
  t.is(typeof a, 'string')
  t.snapshot(a)
})

test('styled-components imports required components', t => {
  const a = templates['styled-components'](compConfig)
  t.is(typeof a, 'string')
  t.regex(a, /import\sDiv\sfrom/)
  t.snapshot(a)
})

test('glamorous returns a string', t => {
  const a = templates.glamorous(config)
  t.is(typeof a, 'string')
  t.snapshot(a)
})

test('glamorous imports required components', t => {
  const a = templates.glamorous(compConfig)
  t.is(typeof a, 'string')
  t.regex(a, /import\sDiv\sfrom/)
  t.snapshot(a)
})

test('emotion returns a string', t => {
  const a = templates.emotion(config)
  t.is(typeof a, 'string')
  t.snapshot(a)
})

test('emotion imports required components', t => {
  const a = templates.emotion(compConfig)
  t.is(typeof a, 'string')
  t.regex(a, /import\sDiv\sfrom/)
  t.snapshot(a)
})

test('fela returns a string', t => {
  const a = templates.fela(config)
  t.is(typeof a, 'string')
  t.snapshot(a)
})

test('fela handles styled-system functions', t => {
  const a = templates.fela({
    name: 'Hello',
    type: 'h2',
    extensionImport: '',
    systemFunctions: 'textAlign,',
    system: ['textAlign'],
    props: '{}',
    style: '{}'
  })
  t.is(typeof a, 'string')
  t.snapshot(a)
})

test('fela imports required components', t => {
  const a = templates.fela(compConfig)
  t.is(typeof a, 'string')
  t.regex(a, /import\sDiv\sfrom/)
  t.snapshot(a)
})

test('cxs returns a string', t => {
  const a = templates.cxs(config)
  t.is(typeof a, 'string')
  t.snapshot(a)
})

test('cxs imports required components', t => {
  const a = templates.cxs(compConfig)
  t.is(typeof a, 'string')
  t.regex(a, /import\sDiv\sfrom/)
  t.snapshot(a)
})

const macro = {
  name: 'Hello',
  imports: ['Box', 'Text'],
  jsx: '<Box><Text>{props.children}</Text></Box>'
}

test('composite returns a string', t => {
  const a = templates.composite(macro)
  t.is(typeof a, 'string')
  t.snapshot(a)
})

test('composite imports required components', t => {
  const a = templates.composite(macro)
  t.is(typeof a, 'string')
  t.regex(a, /import\sBox\sfrom/)
  t.regex(a, /import\sText\sfrom/)
  t.snapshot(a)
})

test('composite has defaults', t => {
  const a = templates.composite({ name: 'Hello' })
  t.snapshot(a)
})

test('css generates utils based on theme', t => {
  const theme = {
    space: [4, 8, 16, 32],
    fontSizes: [12, 16, 24, 32, 64],
    fonts: ['sans-serif', 'monospace'],
    color: {
      red: 'tomato',
      blue: 'bluegreen'
    }
  }

  const result = templates.css({ theme })

  t.snapshot(result)
})
