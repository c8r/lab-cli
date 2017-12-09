module.exports = ({
  name,
  systemFunctions,
  extensionImport,
  type,
  styleString,
  propsString
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
const ${name} = styled(${type}, system({
  ${propsString},
  theme: { default: () => theme }
}))\`
  ${styleString}
  ${space}
  ${fontSize}
  ${width}
  ${color}
  ${systemFunctions}
\``
