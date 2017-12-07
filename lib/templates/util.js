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

const SKIP_STRINGIFY = ['atomic']
const shouldStringify = library => !SKIP_STRINGIFY.includes(library)

const CREG = /^[A-Z]/
const getExtensionImport = type =>
  CREG.test(type) ? `import ${type} from './${type}'\n` : ''

const getComp = type => (CREG.test(type) ? type : "'" + type + "'")
const getSystemFuncs = funcs => funcs.join(',\n')

module.exports = {
  stringifyObject,
  shouldStringify,
  getExtensionImport,
  getComp,
  getSystemFuncs
}
