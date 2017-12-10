module.exports = ({
  name,
  jsx,
  imports = []
}) => `import React from 'react'
${imports.map(name => `import ${name} from './${name}'`).join('\n')}

const ${name} = props => (
  ${jsx}
)

export default ${name}`
