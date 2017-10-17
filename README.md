
# lab-cli

Command line utilities for Compositor Lab

```sh
npm install @compositor/lab
```

Compile lab.json to React components

```sh
lab --out-dir dist/
```

Watch for changes

```sh
lab --out-dir dist/ --watch
```

Export `index.js`, `lab.json`, and `theme.json` for packages

```sh
lab --pkg --out-dir dist/
```

## Options

```
-d --out-dir    Output directory
-w --watch      Watch for changes
--pkg           Include index.js, lab.json, and theme.json in output
```

[Made by Compositor](https://compositor.io)
