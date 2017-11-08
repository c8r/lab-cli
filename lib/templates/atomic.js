const isPresent = require('is-present')

const {
  space,
  fontSize,
  color
} = require('styled-system')

module.exports = ({
  config,
  name,
  props,
  style,
  system,
  type,
  examples
}) => {
  const cx = []

  props = eval(`(${props})`)

  Object.keys(props)
    .map(key => {
      const prop = { [key]: props[key] }

      if (isPresent(space(prop))) {
        cx.push(`${key}${props[key]}`)
        delete props[key]
      } else if (isPresent(fontSize(prop))) {
        cx.push(`${key}${props[key]}`)
        delete props[key]
      } else if (isPresent(color(prop))) {
        cx.push(`${key}-${props[key]}`)
        delete props[key]
      }
    })

  if (cx.length) {
    props.className = cx.join(' ')
  }

  debugger

  return `
import React, { createElement as el } from 'react'

const ${name} = props => el(${type}, props, props.children)

${name}.defaultProps = ${JSON.stringify(props, null, 2)}

export default ${name}`
}
