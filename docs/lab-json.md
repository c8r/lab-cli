
# lab.json

These properties are used in the `lab.json` format to create style component primitives.

- `name` (string) unique name for the component, must be Capitalized and a valid JavaScript variable name
- `type` (string) HTML or SVG tag name or another component name to use as an extension
- `style` (object) plain JavaScript object for static CSS styles
- `props` (object) default props to be passed to the component
- `system` (array) array of strings that reference style functions from [styled-system][styled-system]
- `examples` (array) array of JSX strings for use in documentation and testing
- `description` (string) human readable description of the component
- `keywords` (array) array of taxonomic strings for categorization

[styled-system]: https://github.com/jxnblk/styled-system
