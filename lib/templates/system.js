const PROP_MAP = {
  bg: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  color: 'colors',

  borderRadius: 'radii',
  borderWidths: 'borderWidths',

  f: 'fontSize',
  fontSize: 'fontSize',

  m: 'space',
  mt: 'space',
  mr: 'space',
  ml: 'space',
  mb: 'space',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginLeft: 'space',
  marginBottom: 'space',
  p: 'space',
  pt: 'space',
  pr: 'space',
  pl: 'space',
  pb: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingLeft: 'space',
  paddingBottom: 'space',

  width: 'width',
  w: 'width',

  boxShadow: 'shadows',

  fontWeight: 'fontWeights',

  flex: null,
  align: null,
  justify: null,
  wrap: null,
  flexDirection: null,
  alignSelf: null
}

const CORE_MODULES = ['space', 'colors', 'fontSize', 'width']

const isCore = prop => CORE_MODULES.includes(PROP_MAP[prop])
const isSystem = prop => PROP_MAP.hasOwnProperty(prop)
const isThemed = prop => !!PROP_MAP[prop]

module.exports = PROP_MAP
module.exports.isCore = isCore
module.exports.isSystem = isSystem
module.exports.isThemed = isThemed
module.exports.corePropList = Object.keys(PROP_MAP).filter(isCore)
