module.exports = ({
  name,
  systemFunctions,
  systemFunctionTemplates = '',
  extensionImport,
  type,
  styleString = '',
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
  ${styleString.replace(/\${\s*/g, '${ props => ').replace(/`/g, '').replace(/^{/, '').replace(/}$/, '')}
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
      return `'${value}'`
    case 'object':
      return `() => (${JSON.stringify(value, null, 2)})`
    default:
      return value
  }
}
