const dedent = require('dedent')
const reverse = require('lodash.reverse')

const space = require('./space')
const color = require('./color')
const fontSizes = require('./font-sizes')

module.exports = ({ theme }) =>
  dedent([
    space(theme.space),
    color(theme.color),
    fontSizes(reverse(theme.fontSizes))
  ].join('\n'))

