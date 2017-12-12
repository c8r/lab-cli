import fs from 'fs'
import test from 'ava'
import { vue } from '../lib/templates'
import createModules from '../lib'
import fixture from './fixture.json'

const config = {
  name: 'Hello',
  type: 'h2',
  systemFunctions: '',
  extensionImport: '',
  props: {
    p: 2,
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
    p: 3
  },
  style: {},
  extensionImport: `import Div from './Div'`,
  systemFunctions: ''
}

test('vue returns a code string for extended components', t => {
  const result = vue(extConfig)

  t.is(typeof result, 'string')
  t.snapshot(result)
})

test('vue handles an entire complex library', t => {
  const result = createModules(fixture, {
    library: 'vue',
    harmony: true
  })

  t.snapshot(result)
})
