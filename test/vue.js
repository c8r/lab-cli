import test from 'ava'
import { vue } from '../lib/templates'

const config = {
  name: 'Hello',
  type: 'h2',
  systemFunctions: '',
  extensionImport: '',
  props: `{
  p: 2,
  color: 'black'
}`,
  style: `{
  textDecoration: 'underline'
}`
}

const extConfig = {
  name: 'Box',
  type: 'Div',
  props: '{}',
  style: '{}',
  extensionImport: `import Div from './Div'`,
  systemFunctions: ''
}

test('vue returns a code string for extended components', t => {
  const result = vue(extConfig)

  t.is(typeof result, 'string')
  t.snapshot(result)
})
