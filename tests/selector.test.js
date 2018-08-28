const config = require('../index').rules['plugin/selector-bem-pattern'];
const validateSelectors = require('postcss-bem-linter/lib/validate-selectors');
const each = require('jest-each').default;
const toRegexp = require('postcss-bem-linter/lib/to-regexp');

each([
  // valid block names:
  ['foo', '.foo', true],
  ['a', '.a', true],
  ['abcdeefgdfkafsdkfdf', '.abcdeefgdfkafsdkfdf', true],
  ['foo-bar-baz', '.foo-bar-baz', true],
  ['c-foo', '.c-foo', true],

  ['c-bar', '.c-foo', false],

  // elements
  ['foo', '.foo__bar', true],
  ['foo-bar', '.foo-bar__bar', true],
  ['foo-bar-baz', '.foo-bar-baz__bar', true],
  ['foo-bar-baz', '.foo-bar-baz__bar-eglebegle', true],
  ['foo-bar-baz', '.foo-bar-baz__bar-eglebegle-bam', true],

  // modifiers
  ['foo', '.foo--bar', true],
  ['foo-bar', '.foo-bar--bar', true],
  ['foo-bar-baz', '.foo-bar-baz--bar', true],
  ['foo-bar-baz', '.foo-bar-baz--bar-eglebegle', true],
  ['foo-bar-baz', '.foo-bar-baz--bar-eglebegle-bam', true],

  ['foo', '.foo--bar.foo--baz', true],
  ['foo', '.foo__element--bar.foo__element--baz', true],
  ['foo', '.foo__element--bar.foo--baz', false],
  ['foo', '.foo--bar.foo__element--baz', false],

  // element modifiers
  ['foo', '.foo__element--bar', true],
  ['foo-bar', '.foo-bar__element--bar', true],
  ['foo-bar-baz', '.foo-bar-baz__element--bar', true],
  ['foo-bar-baz', '.foo-bar-baz__element--bar-eglebegle', true],

  // element based on block mod
  ['foo', '.foo--mod .foo__element', true],
  ['foo', '.foo--mod .foo__element--mod', true],
  ['foo', '.foo--mod .bar__element', false],
  ['foo', '.foo--mod .bar__element--mod', false],


  // state modifiers
  ['foo', '.foo.-is-bar', true],
  ['foo', '.foo.-has-bar', true],
  ['foo', '.foo__element.-is-bar', true],
  ['foo', '.foo__element.-has-bar', true],
  ['foo', '.foo__element.-has-', false],
  ['foo', '.foo__element--modifier.-has-bar', true],

  // placeholders:
  ['%foo-bar', '%foo-bar', true],
  ['%foo-bar', '%foo-bar__element', true],
  ['%foo-bar', '%foo-bar__element--modifier', true],
  ['%foo-bar', '%foo-bar--modifier', true],

  // variables in selectors:
  ['foo', '.foo--bar #{$root}__ele-ment--modi-fier', true],
  ['foo', '.foo--bar #{$bar}__ele-ment--modi-fier', false],
  ['foo', '.foo--bar .foo__ele-ment--modi-#{$foo}', true],
  ['foo', '.foo--bar .foo__ele-ment--#{$prefix}-modi', true],
  ['foo', '.foo--bar .foo__ele-ment--#{$foo}', true],
  ['foo', '.foo--bar .foo__ele-ment--#{$prefix}-modi-#{$suffix}', true],

  ['foo', '.foo--bar #{$root}--modi-fier', false],
  ['foo', '.foo--bar #{$bar}--modi-fier', false],
  ['foo', '.foo--modi-#{$foo}', true],
  ['foo', '.foo--#{$prefix}-modi', true],
  ['foo', '.foo--#{$foo}', true],
  ['foo', '.foo--#{$prefix}-modi-#{$suffix}', true],

  ['foo-bar', '.foo-bar__ele-ment--modi-fier', true],

  // exceptions:

  ['foo', '.foo img', true],
  ['foo', '.foo svg', true],

  // invalid stuff:
  ['foo', '.foo-bar', false],
  ['foo-bar-baz', '.foo-bar-baz--modifier__element', false],

  // multiple elements/modifiers, wrong order:
  ['foo', '.foo__bar__baz', false],
  ['foo', '.foo--bar--baz', false],
  ['foo', '.foo--bar__baz', false],

  // non BEM:
  ['foo', '.foo element', false],
  ['foo', '.foo .bar', false],
  ['foo', '.foo #bar', false],
  ['foo', '.foo > .bar', false],

  // non class selectors:
  ['foo', '#foo', false],
  ['element', 'element', false],

]).test('these selectors should match', (componentName, selector, shouldMatch) => {

  let warning = null;

  validateSelectors({
    rule: {
      prev: () => null,
      parent: {
        type: null,
      },
      selectors: [selector],
    },
    componentName: componentName,
    weakMode: false,
    selectorPattern: config.componentSelectors,
    selectorPatternOptions: {}, // ??
    ignorePattern: toRegexp(config.ignoreSelectors),
    result: {
      warn: (message) => warning = message
    },
  });

  const message = [
    `Initial: ${config.componentSelectors.initial}`,
    `Combined: ${config.componentSelectors.combined}`,
    `Selector: ${selector}`
  ].join("\n");

  if (shouldMatch) {
    expect(!warning, message).toBeTruthy();
  } else {
    expect(!warning, message).toBeFalsy();
  }
});
