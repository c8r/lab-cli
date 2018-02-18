// lab webpack loader
// currently only supports styled-components
const { getOptions } = require('loader-utils')
const lab = require('./index')

const template = ({
  name,
  type,
  propsString,
  styleString,
  system = []
}) => (`
export const ${name} = styled(${type})([], props => (${styleString}),
  space,
  fontSize,
  width,
  color,
  ${system.map(name => `system.${name}`)}
)
${name}.defaultProps = ${propsString}
${name}.displayName = '${name}'
`)

module.exports = function (src) {
  const callback = this.async()
  const opts = getOptions(this)

  const config = JSON.parse(src)
  const modules = lab(config, {
    harmony: true,
    template
  })
    .filter(m => m.name !== 'index')
  const moduleNames = modules.map(m => m.name)

  const code = `
    import styled from 'styled-components'
    import system, {
      space,
      fontSize,
      width,
      color
    } from 'styled-system'
    ${modules.map(m => m.module).join('\n\n')}
    export default {
      ${moduleNames.join(',\n')}
    }
  `

  callback(null, code)
}
