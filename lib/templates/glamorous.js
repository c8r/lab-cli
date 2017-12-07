module.exports = ({
  name,
  type,
  propsString,
  styleString,
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

const ${name} = styled(${type})(props => (${styleString}),
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
)

${name}.defaultProps = ${propsString}

export default ${name}`
