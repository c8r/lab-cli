const {
  isTemplateExpression
} = require('./util')

module.exports = ({
  name,
  systemFunctions,
  systemFunctionTemplates = '',
  extensionImport,
  type,
  style,
  props
}) => `import styled from 'vue-styled-components'
import system from 'vue-styled-system'

import {
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
} from 'styled-system'

import theme from './theme.json'
${extensionImport}
export default styled(${type}, system({
  ${formatProps(props)}
  theme: { default: () => theme }
}))\`
${formatStyle(style)}
  \${space}
  \${fontSize}
  \${width}
  \${color}
  ${systemFunctionTemplates}
\`
`

const formatProps = props =>
  Object
    .keys(props)
    .reduce((acc, key) =>
      acc.concat(`${key}: { default: ${formatValue(props[key])} },`)
    , [])
    .join('\n')

const formatValue = value => {
  switch(typeof value) {
    case 'string':
      return isTemplateExpression(value) ? value : `'${value}'`
    case 'object':
      return `() => (${JSON.stringify(value, null, 2)})`
    default:
      return value
  }
}

const formatStyle = style =>
  Object.keys(style).reduce((acc, key) => {
    const val = style[key]
    const parsedVal = typeof val === 'string' ? val.replace(/\${\s*/g, '${ props => ') : val
    return acc.concat(`  ${key}: ${formatValue(parsedVal)}`)
  } , []).join(',\n')
