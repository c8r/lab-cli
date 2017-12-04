const _stringifyObject = require('stringify-object')
const objss = require('objss')

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

const evalString = objAsStr => eval(`(${objAsStr})`)

const CREG = /^[A-Z]/
const getExtensionImport = type =>
  CREG.test(type) ? `import ${type} from './${type}'\n` : ''

const getComp = type => (CREG.test(type) ? type : "'" + type + "'")
const getSystemFuncs = funcs => funcs.join(',\n')

const toCss = str => {
  const cssObj = evalString(str)

  return objss(cssObj)
    .replace(/;/g, ';\n')
    .replace(/:/g, ': ')
}


module.exports = {
  stringifyObject,
  evalString,
  getExtensionImport,
  getComp,
  getSystemFuncs,
  toCss
}
