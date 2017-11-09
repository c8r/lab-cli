const classify = require('@compositor/atomic-classify')
const isPresent = require('is-present')

const {
  isDirectional,
  stripDirectional
} = require('@compositor/atomic-util')

const {
  space,
  fontSize,
  color
} = require('styled-system')

const styledSystemScales = [
  space,
  fontSize,
  color
]

module.exports = ({
  config,
  name,
  props,
  style,
  system,
  type,
  examples,
  theme
}) => {
  const atomicConfig = Object.assign({}, theme, config)

  const cx = []

  props = eval(`(${props})`)
  style = eval(`(${style})`)

  Object
    .keys(style)
    .map(key => {
      const property = key
      const value = style[property]

      cx.push(classify({
        config: atomicConfig,
        property,
        value
      }))
    })

  Object
    .keys(props)
    .forEach(key => {
      const prop = Object.assign({ [key]: props[key], theme })

      styledSystemScales.forEach(system => {
        const systemStyles = system(prop)

        if (isPresent(systemStyles)) {
          delete props[system]

          Object
            .keys(systemStyles)
            .forEach(property => {
              const value = systemStyles[property]

              cx.push(classify({
                config: atomicConfig,
                value: systemStyles[property],
                property
              }))
            })
        }
      })
    })

  if (cx.length) {
    props.className = cx.join(' ')
  }

  return `
import React, { createElement as el } from 'react'

const ${name} = props => el(${type}, props, props.children)

${name}.defaultProps = ${JSON.stringify(props, null, 2)}

export default ${name}`
}
