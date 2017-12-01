const objss = require('objss')
const indent = require('indent')

module.exports = ({
  name,
  systemFunctions,
  extensionImport,
  type,
  style,
  props
}) => `<template>
  <${type.replace(/'/g, '')} v-bind:class='cx' v-bind:style='sx'>
    <slot>Hello</slot>
  </${type.replace(/'/g, '')}>
</template>

<script>
import {
  space,
  fontSize,
  width,
  color,
  ${systemFunctions}
} from 'styled-system'

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
        theme: this.theme
      }

      return [
        space(props),
        fontSize(props),
        width(props),
        color(props),
        ${systemFunctions.replace(/,/, '(props),')}
      ].reduce(this.sxMerge)
    }
  }
}
</script>

<style scoped>
  .${name} {
${indent(objss(eval('(' + style + ')')).replace(/;/g, ';\n'), 4)}
  }
</style>
`
