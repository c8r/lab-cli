const isObj = require('isobject')
const isPresent = require('is-present')

const fetch = ({ config, prop, value }) => {
  const values = config[prop] || []

  const v = values.find(v =>
    isobject(v)) ? v.value === value : v === value
  )

  return {
    prop,
    value,
    lib: isPresent(v)
}

const cxify = ({ prop, value, config }) => {
  const val = config.values[value] || value

  const baseProp = config.properties[prop] || prop
  const property = isObj(baseProp) ? baseProp : { value: prop }

  const del = propert.delimiter || config.delimiter || ''

  return [
    property.value || prop,
    val
  ].join(del)
}

module.exports = {
  fetch,
  cxify
}
