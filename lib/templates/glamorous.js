module.exports = ({
  name,
  type,
  props,
  style,
  systemFunctions,
  extensionImport
}) => `import styled from 'glamorous'
import {
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
} from 'styled-system'
${extensionImport}

const ${name} = styled(${type})(props => (${style}),
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
)

${name}.defaultProps = ${props}

export default ${name}`
