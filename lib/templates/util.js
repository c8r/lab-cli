const _stringifyObject = require('stringify-object')

const SREG = /\$\{.*\}/
const transform = (obj, prop, original) => {
  const val = obj[prop]
  if (SREG.test(val)) {
    return original
      .replace(/^'/, '`')
      .replace(/'$/, '`')
      .replace(/\\'/g, `'`)
  }
  return original
}

const stringifyOptions = {
  indent: '  ',
  transform
}

const stringifyObject = obj => _stringifyObject(obj, stringifyOptions)

const CREG = /^[A-Z]/
const getExtensionImport = type =>
  CREG.test(type) ? `import ${type} from './${type}'\n` : ''

const getComp = type => (CREG.test(type) ? type : "'" + type + "'")
const getSystemFuncs = funcs => funcs.join(',\n')
const getSystemExpressions = funcs => funcs.map(f => '${' + f + '}').join('\n')

const EXPRESSION_REG = /^\${(.*)}$/
const isTemplateExpression = str => EXPRESSION_REG.test(str)

module.exports = {
  stringifyObject,
  getExtensionImport,
  getComp,
  getSystemFuncs,
  getSystemExpressions,
  isTemplateExpression
}
