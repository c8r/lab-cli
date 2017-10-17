module.exports = ({
  name,
  systemFunctions,
  extensionImport,
  type,
  style,
  props
}) => `import styled from 'cxs/component'
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
