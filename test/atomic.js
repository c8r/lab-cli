import test from 'ava'
import { atomic } from '../lib/templates'

const config = {
  name: 'Hello',
  type: 'h2',
  systemFunctions: '',
  extensionImport: '',
  props: {
    px: 2,
    py: 1,
    bg: 'purple',
    color: 'black'
  },
  style: {
    textDecoration: 'underline'
  }
}

const extConfig = {
  name: 'Box',
  type: 'Div',
  props: {
    flex: true,
    children: 'Hello, world'
  },
  style: {},
  extensionImport: `import Div from './Div'`,
  system: ['flex']
}

test('atomic returns a code string with the correct classes', t => {
  const result = atomic(config)

  t.is(typeof result, 'string')
  t.snapshot(result)
})

test('atomic returns a code string for extended components', t => {
  const result = atomic(extConfig)

  t.is(typeof result, 'string')
  t.snapshot(result)
})
