module.exports = (fontSizes, namingConfig = {}) => {
  const naming = Object.assign({}, {
    'font-size': 'f'
  }, namingConfig)

  const generateAll = prop =>
    fontSizes
      .map((f, i) => `.${naming[prop]}${i+1} { ${prop}: ${f}px }`)
      .join('\n')

  return [`
    /*!!!
      # Font Sizes

      Utilities for font sizes

      ### Base

      - ${naming['font-size']} = font-size

      ### Modifiers

${fontSizes.map((f, i) => `      - ${i+1} = ${f}px`).join('\n')}

      ***

      Generated with Compositor Lab
    */
  `,
    generateAll('font-size')
  ].join('\n')
}
