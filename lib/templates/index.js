const composite = require('./composite')
const styledComponents = require('./styledComponents')
const glamorous = require('./glamorous')
const emotion = require('./emotion')
const cxs = require('./cxs')
const fela = require('./fela')
const vue = require('./vue')

module.exports = {
  // React
  composite,
  'styled-components': styledComponents,
  glamorous,
  emotion,
  cxs,
  fela,

  // Vue
  vue
}
