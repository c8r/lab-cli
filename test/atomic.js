import test from 'ava'
import createModules from '../lib'

const config = [
  {
    name: 'Box',
    type: 'div',
    props: {
      bg: 'tomato'
    },
    style: {
      'text-transform': 'uppercase'
    }
  },
  {
    name: 'Text',
    type: 'p',
    props: {
      py: 5
    },
    style: {
      'text-align': 'right',
      'line-height': '3',
      'font-size': '16px'
    }
  },
  {
    name: 'Hello',
    imports: ['Box', 'Text'],
    jsx: '<Box><Text /></Box>'
  },
  {
    name: 'Beep',
    type: 'Box',
    props: {},
    style: {}
  },
  {
    name: 'Flex',
    type: 'Box',
    props: {
      m: 2
    },
    style: {
      display: 'flex',
    },
    system: ['alignItems', 'justifyContent', 'flexDirection', 'flexWrap']
  }
]

const theme = {
  space: [4, 8, 16, 32, 64, 128, 256]
}

test('adds expected classes to elements', t => {
  const result = createModules(config, {
    library: 'atomic',
    theme
  })

  t.snapshot(result)
})
