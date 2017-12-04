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

test('vue returns a string', t => {
  const result = vue(config)

  t.is(typeof result, 'string')
  t.snapshot(result)
})
