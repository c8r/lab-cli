module.exports = (fontFamilies, namingConfig = {}) => {
  const naming = Object.assign({}, {
    'font-family': 'font-'
  }, namingConfig)

  const generateAll = prop =>
    fontFamilies
      .map((f, i) => `.${naming[prop]}${i+1} { ${prop}: ${f} }`)
      .join('\n')

  return [`
    /*!!!
      # Font Families

      Utilities for font families

      ### Base

      - ${naming['font-family']} = font-family

      ### Modifiers

${fontFamilies.map((f, i) => `      - ${i+1} = ${f}`).join('\n')}

      ***

      Generated with Compositor Lab
    */
  `,
    generateAll('font-family')
  ].join('\n')
}
