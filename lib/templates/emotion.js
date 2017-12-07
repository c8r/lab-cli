module.exports = ({
  name,
  type,
  styleString,
  propsString,
  systemFunctions,
  extensionImport
}) => `import styled from 'react-emotion'
import { withTheme } from 'theming'
import {
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
} from 'styled-system'
${extensionImport}

const ${name} = withTheme(styled(${type})(props => (${styleString}),
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
))

${name}.defaultProps = ${propsString}

export default ${name}`
