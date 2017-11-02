module.exports = (spacing, namingConfig = {}) => {
  const naming = Object.assign({}, {
    padding: 'p',
    margin: 'm',
    horizontal: 'x',
    vertical: 'y',
    all: '',
    top: 't',
    left: 'l',
    right: 'r',
    bottom: 'b'
  }, namingConfig)

  const generateAll = prop =>
    Array.of(0)
      .concat(spacing)
      .map((s, i) => ([
        `.${naming[prop]}${naming.all}${i} { ${prop}: ${s}px; }`,
        `.${naming[prop]}${naming.top}${i} { ${prop}-top: ${s}px; }`,
        `.${naming[prop]}${naming.left}${i} { ${prop}-left: ${s}px; }`,
        `.${naming[prop]}${naming.right}${i} { ${prop}-right: ${s}px; }`,
        `.${naming[prop]}${naming.bottom}${i} { ${prop}-bottom: ${s}px; }`,
        `.${naming[prop]}${naming.horizontal}${i} { ${prop}-left: ${s}px; ${prop}-right: ${s}px; }`,
        `.${naming[prop]}${naming.vertical}${i} { ${prop}-top: ${s}px; ${prop}-bottom: ${s}px; }`
        ].join('\n'))
      ).join('\n')

  return [`
    /*!!!
      # Spacing

      Spacing utilities for margin and padding.

      ### Base

      - ${naming.padding} = padding
      - ${naming.margin} = margin

      ### Modifiers

      - 0 = none
${spacing.map((s, i) => `      - ${i+1} = ${s}px`).join('\n')}

      ***

      Generated with Compositor Lab
    */
  `,
    generateAll('padding'),
    generateAll('margin')
  ].join('\n')
}
