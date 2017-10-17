module.exports = ({
  name,
  type,
  props,
  style,
  system = [],
  systemFunctions,
  extensionImport
}) => `import { createComponent } from 'react-fela'
import {
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
} from 'styled-system'
${extensionImport}

const ${name} = createComponent(props => Object.assign(${style},
  space(props),
  fontSize(props),
  width(props),
  color(props),
  ${system.map(fn => `${fn}(props)`).join(',\nss')}
), ${type})

${name}.defaultProps = ${props}

export default ${name}`
