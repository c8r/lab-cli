module.exports = ({
  name,
  type,
  styleString,
  propsString,
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

const ${name} = styled(${type})([], props => (${styleString}),
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
)

${name}.defaultProps = ${propsString}

export default ${name}`
