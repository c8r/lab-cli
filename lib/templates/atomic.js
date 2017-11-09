const classify = require('@compositor/atomic-classify')
const isPresent = require('is-present')
const uniq = require('lodash.uniq')

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

  props = eval(`(${props})`)
  style = eval(`(${style})`)

  const cx = [
    classifyStyle(style, atomicConfig),
    classifyProps(props, atomicConfig, theme)
  ].join(' ')

  if (isPresent(cx)) {
    props.className = cx.trim()
  }

  return `
import React, { createElement as el } from 'react'

const ${name} = props => el(${type}, props, props.children)

${name}.defaultProps = ${JSON.stringify(props, null, 2)}

export default ${name}`
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

      styledSystemScales.forEach(system => {
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

      // TODO: Figure out way array values are being duped
      return uniq(cx).join(' ')
    })
    .join(' ')

