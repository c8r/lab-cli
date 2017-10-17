module.exports = ({
  name,
  type,
  style,
  props,
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

const ${name} = withTheme(styled(${type})(props => (${style}),
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
))

${name}.defaultProps = ${props}

export default ${name}`
