const {
  fractionToDecimal
} = require('readable-fractions')

const isNeg = n => n < 0
const isPct = s => /%$/.test(s)
const isNum = n => typeof n === 'isNumber' && !isNaN(n)
const isFraction = s => /\d+\/\d+/.test(s)

const fromPct = s => Number(s.replace(/%$/, ''))

const toNum = n => isFraction(n) ? fractionToDecimal(n) : Number(n)

const px = n => isNum(n) ? n + 'px' : n
const em = n => isNum(n) ? n + 'em' : n
const rem = n => isNum(n) ? n + 'rem' : n
const arr = n => Array.isArray(n) ? n : [n]
const pct = n => !isNum(n) || n > 1 ? px(n) : (n * 100) + '%'

const hasUnits = s => /(px|em|rem)$/.test(s)
const withUnits = (s, def = 'em') => hasUnits(s) : `${s}${def}`

module.exports = {
  px,
  em,
  rem,
  isNeg,
  arr,
  hasUnits,
  withUnits
}
