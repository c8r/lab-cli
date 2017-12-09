const uniq = require('lodash.uniq')
const flatten = require('lodash.flatten')
const getProps = require('@compositor/get-jsx-props')

module.exports = (args, library) => {
  const fn = library === 'vue' ? vue : react
  return fn(args)
}

const react = ({ name, imports = [], jsx, library }) => `import React from 'react'
${imports.map(name => `import ${name} from './${name}'`).join('\n')}

const ${name} = props => (
  ${jsx}
)

export default ${name}`

const vue = ({
  name,
  jsx,
  library,
  imports = [],
  examples = []
}) => {
  const props = uniq(flatten(examples.map(getProps)).map(s => s.prop))

  return `
    ${imports.map(name => `import ${name} from './${name}'`).join('\n')}

    export default {
      name: '${name}',
      props: ${JSON.stringify(props)},
      render (h) {
        return (
          ${jsx.replace(/props/g, 'this')}
        )
      }
    }
  `
}
