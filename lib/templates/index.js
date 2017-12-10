const compositeReact = require('./composite-react')
const compositeVue = require('./composite-vue')
const styledComponents = require('./styledComponents')
const glamorous = require('./glamorous')
const emotion = require('./emotion')
const cxs = require('./cxs')
const fela = require('./fela')
const atomic = require('./atomic')
const vue = require('./vue')

module.exports = {
  // React
  compositeReact,
  'styled-components': styledComponents,
  glamorous,
  emotion,
  cxs,
  fela,
  atomic,

  // Vue
  compositeVue,
  vue
}
