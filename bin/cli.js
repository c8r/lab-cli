#! /usr/bin/env node
const fs = require('fs')
const path = require('path')
const meow = require('meow')
const dxs = require('dxs/modules')
const writeFile = require('write-file-atomic')
const chokidar = require('chokidar')
const findUp = require('find-up')
const chalk = require('chalk')
const ora = require('ora')

const pkg = require('../package.json')
require('update-notifier')({ pkg }).notify()

const cli = meow(`
  Usage
    $ lab --out-dir src/
    $ lab d src/ --watch

  Options
    -d --out-dir    Output directory
    -w --watch      Watch for changes
`, {
  alias: {
    d: 'outDir',
    w: 'watch'
  }
})

const [ file ] = cli.input

const badge = chalk.black.bgCyan(' L A B ')
console.log(badge)

const spinner = ora().start()
const filepath = file
  ? path.join(process.cwd(), file)
  : findUp.sync('lab.json')

if (!filepath || !fs.existsSync(filepath)) {
  spinner.fail('no lab.json file found')
  process.exit(1)
}

if (!cli.flags.outDir) {
  spinner.fail('no output directory specified')
  process.exit(1)
}

const config = require(filepath)

const length = Array.isArray(config.components)
  ? config.components.length
  : 0

if (length) {
  spinner.succeed(length + ' components found')
} else {
  spinner.fail('no components found in lab.json')
  process.exit(0)
}

const write = (file, content) => {
  writeFile(file, content, err => {
    if (err) {
      spinner.fail(err)
      process.exit(1)
    }
  })
}

let cache = []

const filterChanges = component => {
  const cached = cache.find(c => c.name === component.name)
  if (!cached) return true
  const a = JSON.stringify(cached)
  const b = JSON.stringify(component)
  return a !== b
}

const parseConfig = (config) => {
  const changes = config.components
    .filter(filterChanges)
    .map(c => c.name)
  const modules = dxs(config.components, config)
  modules
    .filter(m => changes.includes(m.name))
    .forEach(mod => {
      const filename = path.join(cli.flags.outDir, mod.name + '.js')
      write(filename, mod.module)
      spinner.succeed(filename + ' written')
    })
  cache = config.components
}

if (!fs.existsSync(cli.flags.outDir)) {
  fs.mkdirSync(cli.flags.outDir)
}

parseConfig(config)

if (cli.flags.watch) {
  const watcher = chokidar.watch(filepath)
  spinner.info('watching for changes')

  watcher.on('change', file => {
    spinner.start('updating...')
    delete require.cache[require.resolve(file)]
    const next = require(file)
    parseConfig(next)
    spinner.succeed('updated')
  })
} else {
  spinner.succeed('done')
}

