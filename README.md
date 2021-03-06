# stylelint-config-syzygy-bem
> SYZYGY [`stylelint`](https://github.com/stylelint/stylelint) config for BEM methodology

Stylelint BEM config build upon [`stylelint-selector-bem-pattern`](https://github.com/simonsmith/stylelint-selector-bem-pattern) plugin.

## Rules

* [Two Dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) naming scheme -
  `block__element--modifier`.
* One block (component) per one file.
* Block names consistent with filenames (minus extension and optional `_` filename prefix for Sass/SCSS).
* `svg` and `img` can be styled by tag name.
* [No namespace](https://en.bem.info/methodology/naming-convention/#no-namespace-style) modifiers
  are accepted for component state - `-is-` and `-has` prefixed classnames (_for example `.block.-is-active`_).    

_You can accept this config as it is or just copy-paste the things you like from [index.js](index.js)._

## Installation

Make sure you have `stylelint` installed:
```bash
npm install --save-dev stylelint
```

then install the config:
```bash
npm install --save-dev stylelint-config-syzygy-bem
```

## Usage

Simply set your `stylelint` config to extend `stylelint-config-syzygy-bem`:

```json
{
  "extends": "stylelint-config-syzygy-bem"
}
```

### Implicit components

By default all linted stylesheets are treated as implicit components. It means that component
names used for linting are based on the filenames. Although [plugin config allows to narrow down
implicit components](https://github.com/postcss/postcss-bem-linter#define-components-and-utilities-implicitly-based-on-their-filename),
[stylelint does not allow to merge nested options](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/faq.md#if-i-use-extends-within-my-configuration-object-will-the-options-for-each-rule-be-merged-or-overridden).
It means that to disable it for some files, `stylelint-disable` comment is required. Example:

```css
/* not-bem.css */
/* stylelint-disable plugin/selector-bem-pattern */
a {
    color: inherit;
}
/* stylelint-enable plugin/selector-bem-pattern */
```


### Usage with other configs

**This config contains only rules for BEM.**
It rather should not be used standalone. You can extend multiple configs.
We recommend to use `stylelint-config-syzygy-bem` with
[`stylelint-config-syzygy-scss`](https://github.com/syzygypl/stylelint-config-syzygy-scss)
or [any other config](https://www.npmjs.com/search?q=stylelint-config&ranking=popularity)
that fits your needs.

Example usage with `stylelint-config-syzygy-scss`:

```json
{
  "extends": [
    "stylelint-config-syzygy-bem",
    "stylelint-config-syzygy-scss"
  ]
}
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
