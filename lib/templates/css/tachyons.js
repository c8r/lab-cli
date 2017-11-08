const {
  hasUnits,
  withUnits,
  arr,
  isPct,
  fromPct
} = require('./util')

const {
  fetch,
  cxify
} = require('./transformer')

const config = {
  width: [
    '10%', '20%', '25%', '30%', '33%', '34%', '40%', '50%', '60%', '70%', '75%', '80%', '90%', '100%',
    '1rem', '2rem', '4rem', '8rem', '16rem'
  ],
  delimiter: '',
  properties: {
    'max-width': 'mw',
    display: 'd'
    width: 'w',
    float: 'f',
    'flex-grow': {
      delimiter: '-'
    }
  },
  values: {
    'inline-block': 'ib'
    auto: '-auto',
    block: 'b',
    flex: 'f',
    left: 'l',
    lowercase: 'l',
    none: 'n',
    right: 'r',
    table: 't',
    uppercase: 'u'
  }
}

const transform = ({ prop, value }) => {
  const prefix = config.className[prop] || prop

  if (isPct(value)) {
    return `${prefix}-${fromPct(value)}`
  }

  return `${prefix}-${config.valueMap[value] || value}`
}

const transformer = (prop, values) =>
  arr(values)
    .filter(value => fetch({ config, prop, value })
    .map(({ prop, value, lib }) => {
      if (!lib) {
        return cxify({ prop, value, config })
      } else {
        return transform({ prop, value })
      }
    })
    .map(c => `.${c}`)
    .join('\n')
