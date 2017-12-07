
# lab-cli

Command line utilities and exporting module for [Compositor Lab][lab]

```sh
npm install @compositor/lab
```

## CLI Usage

Compile `lab.json` to React components:

```sh
lab --out-dir dist/
```

Watch for changes:

```sh
lab --out-dir dist/ --watch
```

### Lab Packages

Lab projects can be published in a way that allows them to be installed and imported into other Lab projects from the app.

Export `index.js`, `lab.json`, and `theme.json` for packaging Lab projects:

```sh
lab --pkg --out-dir dist/
```

### CLI Options

```
-d --out-dir    Output directory
-w --watch      Watch for changes
--pkg           Include index.js, lab.json, and theme.json in output
```

## Node Usage

The Node API is used by the Lab app to export lab components to React and other formats.

`lab(config, [options])`

Returns an array of objects for writing to files.

```js
const fs = require('fs')
const path = require('path')
const lab = require('@compositor/lab')
const config = require('./lab.json')

const modules = lab(config)

modules.forEach(mod => {
  const filename = path.join(__dirname, 'dist', mod.name + '.js')
  fs.writeFile(filename, mod.module, err => {
    if (err) console.log(err)
  })
})
```

### Options

#### `library`

A string key to choose an output mode, one of the following:

- `styled-components`
- `glamorous`
- `emotion`
- `fela`
- `cxs`

#### `harmony`

Boolean to export the template without transpiling to ES5 syntax.

## Templates

Currently this module uses templates to output to different formats.
These templates can be found in [`lib/templates/`](https://github.com/c8r/lab-cli/tree/master/lib/templates).
Using an AST for output with tools like Babel is also possible,
but templates were used in an attempt to make it easier to contribute to this project.

## Roadmap

- Vue.js export
- Atomic CSS export
- Support for using third party CSS libraries

[MIT License](LICENSE.md)
[Made by Compositor](https://compositor.io)

[lab]: https://compositor.io/lab/
