module.exports = ({
  name,
  systemFunctions,
  extensionImport,
  type,
  styleString,
  propsString
}) => `import styled from 'cxs/component'
import {
 space,
 fontSize,
 width,
 color,
 ${systemFunctions}
} from 'styled-system'
${extensionImport}

const ${name} = styled(${type})(props => (${styleString}),
  space,
  fontSize,
  width,
  color,
 ${systemFunctions}
)

${name}.defaultProps = ${propsString}

${name}.displayName = '${name}'

export default ${name}`
