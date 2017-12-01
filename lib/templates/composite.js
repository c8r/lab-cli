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

const vue = ({ name, imports = [], jsx, library }) => `<script>
${imports.map(name => `import ${name} from './${name}'`).join('\n')}

export default {
  name: '${name}',
  render () {
    return (
      ${jsx.replace(/props/g, 'this')}
    )
  }
}
</script>`
