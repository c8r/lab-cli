const dedent = require('dedent')

const space = require('./space')
const color = require('./color')

module.exports = ({ theme }) =>
  dedent([
    space(theme.space),
    color(theme.color)
  ].join('\n'))

