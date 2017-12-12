const { classify } = require('@compositor/atomic')
const isPresent = require('is-present')
const uniq = require('lodash.uniq')

const styledSystem = require('styled-system')

const systemProps = require('./system')
const isSystem = prop => !!systemProps[prop]

const getSystemFns = system => ([
  styledSystem.space,
  styledSystem.fontSize,
  styledSystem.width,
  styledSystem.color
].concat(system.map(s => styledSystem[s])))

module.exports = ({
  config,
  name,
  props,
  style,
  system = [],
  type,
  examples,
  theme
}) => {
  const atomicConfig = Object.assign({}, theme, config, { system })

  const cx = [
    name,
    classifyStyle(style, atomicConfig),
    classifyProps(props, atomicConfig, theme)
  ].join(' ')

  const defaultProps = Object.keys(props).reduce((acc, curr) =>
    isSystem(curr) ? acc : Object.assign(acc, { [curr]: props[curr] })
  , {})

  defaultProps.className = cx.trim()

  return `
    import React from 'react'

    const ${name} = props => <${type} />

    ${name}.defaultProps = ${JSON.stringify(defaultProps, null, 2)}

    export default ${name}
  `
}

const classifyStyle = (style, config) =>
  Object
    .keys(style)
    .map(key => {
      const property = key
      const value = style[property]

      return classify({
        config,
        property,
        value
      })
    })
    .join(' ')

const classifyProps = (props, config, theme) =>
  Object
    .keys(props)
    .map(key => {
      const cx = []

      const prop = Object.assign({ [key]: props[key], theme })

      getSystemFns(config.system).forEach(system => {
        const systemStyles = system(prop)

        if (Array.isArray(props[key])) {
          return cx.push(classify({
            config,
            property: key,
            value: props[key]
          }))
        }

        if (isPresent(systemStyles)) {
          Object
            .keys(systemStyles)
            .forEach(property => {
              const value = systemStyles[property]

              cx.push(classify({
                value: systemStyles[property],
                property,
                config
              }))
            })
        }
      })

      return uniq(cx).join(' ')
    })
    .join(' ')
