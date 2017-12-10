const { format } = require('prettier')
const { transform } = require('babel-core')
const createIndex = require('./createIndex')
const templates = require('./templates')
const compositeReact = require('./templates/composite-react')
const compositeVue = require('./templates/composite-vue')
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

const parse = (config) => {
  const {
    style = {},
    props = {},
    system = [],
    type = 'div'
  } = config
 return Object.assign({}, config, {
    style,
    props,
    systemFunctions: getSystemFuncs(system),
    extensionImport: getExtensionImport(type),
    type: getComp(type),
    styleString: stringifyObject(style),
    propsString: stringifyObject(props)
  })
}

const composite = (parsed, library) =>
  library === 'vue' ? compositeVue(parsed) : compositeReact(parsed)

module.exports = (config, options = {}) => {
  const components = Array.isArray(config) ? config : config.components
  const {
    library = 'styled-components',
    harmony
  } = options

  const template = options.template || templates[library] || templates['styled-components']

  const index = {
    name: 'index',
    module: harmony ? createIndex(components) : compile(createIndex(components))
  }

  const mods = components.map(conf => {
    const parsed = parse(conf)

    const code = isComposite(parsed) ? composite(parsed, library) : template(parsed)

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
