const PROP_MAP = {
  bg: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',

  borderRadius: 'radii',

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

  shadow: 'shadows',

  width: 'width',
  w: 'width'
}

const CORE_MODULES = ['space', 'color', 'fontSize', 'width']

const isCore = prop => CORE_MODULES.includes(PROP_MAP[prop])

module.exports = PROP_MAP
module.exports.isCore = isCore
module.exports.corePropList = Object.keys(PROP_MAP).filter(isCore)
