const dedent = require('dedent')
const reverse = require('lodash.reverse')

const space = require('./space')
const color = require('./color')
const fontSizes = require('./font-sizes')
const fontFamilies = require('./font-families')

module.exports = ({ theme }) =>
  dedent([
    space(theme.space),
    color(theme.color),
    fontSizes(reverse(theme.fontSizes)),
    fontFamilies(theme.fonts)
  ].join('\n'))

