const { format } = require('prettier')
const { transform } = require('babel-core')
const createIndex = require('./createIndex')
const templates = require('./templates')
const composite = require('./templates/composite')
const {
  stringifyObject,
  getExtensionImport,
  getComp,
  getSystemFuncs
} = require('./templates/util')

const compile = code =>
  transform(code, {
    presets: [
      require('babel-preset-env'),
      require('babel-preset-stage-0'),
      require('babel-preset-react')
    ]
  }).code

const parse = conf =>
  Object.assign({}, conf, {
    systemFunctions: getSystemFuncs(conf.system || []),
    extensionImport: getExtensionImport(conf.type),
    type: getComp(conf.type || 'div'),
    style: stringifyObject(conf.style || {}),
    props: stringifyObject(conf.props || {})
  })

module.exports = (config, options = {}) => {
  const components = Array.isArray(config) ? config : config.components
  const {
    library = 'styled-components',
    theme = {},
    harmony
  } = options

  const template = options.template || templates[library] || templates['styled-components']

  const index = {
    name: 'index',
    module: harmony ? createIndex(components) : compile(createIndex(components))
  }

  const mods = components.map(conf => {
    const parsed = Object.assign({}, parse(conf), { theme })
    const code = isComposite(parsed) ? composite(parsed) : template(parsed)
    const mod = harmony
      ? format(code, {
          semi: false,
          singleQuote: true
        })
      : compile(code)

    return {
      name: conf.name,
      module: mod
    }
  })

  return [index, ...mods]
}

const isComposite = comp => comp.imports && comp.jsx
