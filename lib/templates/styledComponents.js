module.exports = ({
  name,
  type,
  style,
  props,
  systemFunctions,
  extensionImport
}) => `import styled from 'styled-components'
import {
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
} from 'styled-system'
${extensionImport}

const ${name} = styled(${type})([], props => (${style}),
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
)

${name}.defaultProps = ${props}

export default ${name}`
