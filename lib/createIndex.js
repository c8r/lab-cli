module.exports = components =>
  ['lab', 'theme', ...components.map(conf => conf.name)]
    .map(name => `export { default as ${name} } from './${name}'`)
    .join('\n')
