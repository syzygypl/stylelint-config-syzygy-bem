"use strict";

const IDENTIFIER = '[a-z][a-z0-9]*'; // foo
const IDENTIFIER_FOLLOWING = '[a-z0-9]+'; // 0foo
const VARIABLE_NAME = `#{\\$${IDENTIFIER}}`;
const ROOT_VARIABLE = '#{\\$root}';

const BLOCK_NAME = `${IDENTIFIER}(-${IDENTIFIER_FOLLOWING})*`; // foo-bar, foo, foo-bar-baz
const ELEMENT_NAME = `${IDENTIFIER_FOLLOWING}(?:-${IDENTIFIER_FOLLOWING})*`; // foo-bar, foo, foo-bar-baz, 0foo-bar
const MODIFIER_NAME = `(?:(?:${VARIABLE_NAME}-)?${ELEMENT_NAME}(?:-${VARIABLE_NAME})?|${VARIABLE_NAME})` ; // #{$var}-foo-#{$var}, #{$var}-foo, #{$var}
const NO_NAMESPACE_MODIFIERS = `(?:is|has)-(${ELEMENT_NAME})`; // is-bar, has-baz, is-foo-bar
const SUFFIX = `(?:--${MODIFIER_NAME})?(?:\\.-${NO_NAMESPACE_MODIFIERS})?`;
const PREFIX = `(?:\\.|(?=%))`; // component starts with a dot, placeholder needs a %

const FILE_NAME = `^%?${BLOCK_NAME}$`
const INITIAL_SELECTOR = `^(${PREFIX}{componentName}(?:__${ELEMENT_NAME})?)${SUFFIX}((\\1|${ROOT_VARIABLE})${SUFFIX})?$`;
const COMBINED_SELECTOR = `^(\\.{componentName}|${ROOT_VARIABLE})__${ELEMENT_NAME}${SUFFIX}$`;

module.exports = {
  "plugins": [
    "stylelint-selector-bem-pattern",
  ],
  "rules": {
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "plugin/selector-bem-pattern": {
      "implicitComponents": true,
      "componentName": FILE_NAME,
      "componentSelectors": {
        "initial": INITIAL_SELECTOR,
        "combined": COMBINED_SELECTOR,
      },
      "ignoreSelectors": [
        "^(svg|img)$",
      ],
    },
  },
};
