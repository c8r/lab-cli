const objss = require('objss')
const { format } = require('prettier')
const indent = require('indent')

module.exports = ({
  name,
  systemFunctions,
  extensionImport,
  type,
  style,
  props
}) => {
  const template = `
<template>
  <${type.replace(/'/g, '')} v-bind:class='cx' v-bind:style='sx'>
    <slot>Hello</slot>
  </${type.replace(/'/g, '')}>
</template>`.trim()

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
    data () {
      return ${indent(props, 4).trim()}
    },
    computed: {
      cx () {
        return {
          ${name}: true
        }
      },
      sx () {
        const props = {
          ...this._data,
          ...this.$attrs,
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
