module.exports = (colors, namingConfig = {}) => {
  const naming = Object.assign({}, {
    'border-color': 'b--',
    'background-color': 'bg-',
    color: 'text-'
  }, namingConfig)

  const generateAll = prop =>
    Object
      .keys(colors)
      .map((c, i) => `.${naming[prop]}${c} { ${prop}: ${colors[c]}' }`)
      .join('\n')

  return [`
    /*!!!
      # Color

      Color utilities for border, background and text color.

      ### Base

      - ${naming.color} = color
      - ${naming.background} = background-color
      - ${naming.border} = border-color

      ### Modifiers

${Object.keys(colors).map((c, i) => `      - ${c}`).join('\n')}

      ***

      Generated with Compositor Lab
    */
  `,
    generateAll('color'),
    generateAll('background-color'),
    generateAll('border-color')
  ].join('\n')
}
