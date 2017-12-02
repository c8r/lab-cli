const objss = require('objss')
const { format } = require('prettier')
const indent = require('indent')
const isVoid = require('is-void-element')

const { corePropList } = require('../util/system')

const templ = type => {
  const tag = type.replace(/'/g, '')

  if (isVoid(tag)) {
    return `
<template>
  <${tag} :class='cx' :style='sx' />
</template>`
  } else {
    return `
<template>
  <${tag} :class='cx' :style='sx'>
    <slot></slot>
  </${tag}>
</template>`
  }
}

module.exports = ({
  name,
  systemFunctions,
  extensionImport,
  type,
  style,
  props
}) => {
  const template = templ(type).trim()

  const propObject = eval('(' + props + ')')

  const definedProps = Object.keys(propObject).reduce((acc, key) =>
    Object.assign({}, acc, { [key]: { default: propObject[key] }})
  , {})

  const coreProps = corePropList
    .filter(prop => !propObject[prop])
    .reduce((acc, prop) => Object.assign({}, acc, { [prop]: 'DEFAULT_PROPS' }), {})

  const allProps = Object.assign({}, coreProps, definedProps)

  const script = format(`
  import {
    space,
    fontSize,
    width,
    color,
    ${systemFunctions}
  } from 'styled-system'

  ${extensionImport}

  export default {
    name: '${name}',
    props: ${indent(JSON.stringify(allProps, null, 2).replace(/"DEFAULT_PROPS"/g, '[String, Array, Number]'), 4).trim()},
    computed: {
      cx () {
        return {
          ${name}: true
        }
      },
      sx () {
        const props = {
          ...this._props,
          theme: this.theme
        }

        return [
          space(props),
          fontSize(props),
          width(props),
          color(props),
          ${systemFunctions.replace(/,/, '(props),')}
        ].reduce((acc, curr) => Object.assign({}, acc, curr))
      }
    }
  }`, {
    semi: false,
    singleQuote: true
  }).trim().replace('sx()', 'sx ()').replace('cx()', 'cx ()').replace('data()', 'data ()')

  const cssObj = eval('(' + style + ')')
  const declarations = objss(cssObj).replace(/;/g, ';\n').replace(/:/g, ': ')
  const css = `
<style scoped>
  .${name} {
    ${indent(declarations, 4).trim()}
  }
</style>`.trim()

  const fullScript = `
<script>
${script}
</script>
`.trim()

  return [
    template,
    fullScript,
    css
  ].join('\n\n')
}
