module.exports = ({
  name,
  type,
  styleString,
  propsString,
  systemFunctions,
  systemExpressions = '',
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

const ${name} = styled(${type})\`
  \${styleString}
  \${space}
  \${fontSize}
  \${width}
  \${color}
  ${systemExpressions}
\`

${name}.defaultProps = ${propsString}

export default ${name}`
