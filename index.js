"use strict";

const BLOCK_NAME = "[a-z][a-z0-9]*((?!-$)-?[a-z0-9]+)*";
const NO_NAMESPACE_MODIFIERS = ".-is-|.-has-";
const BLOCK_TAIL = "(((__|--|"+ NO_NAMESPACE_MODIFIERS +")(([a-z0-9\\[\\]'=]+(?!-$)-?)+))+)";
const VARIABLE = "#{\\$" + BLOCK_NAME + "}";
const VARS_IN_MODIFIER = "-((-#{\\$[a-z]+}|(-[a-z0-9]+)))*";

module.exports = {
  "plugins": [
    "stylelint-selector-bem-pattern",
  ],
  "rules": {
    "plugin/selector-bem-pattern": {
      "implicitComponents": true,
      "componentName": "^%?" + BLOCK_NAME + "$",
      "componentSelectors": {
        "initial": "^\\.{componentName}" + BLOCK_TAIL + "?$",
      },
      "ignoreSelectors": [
        "^%" + BLOCK_NAME + BLOCK_TAIL + "?$", // %placeholders
        "^#{\\$root}" + BLOCK_TAIL + "?$", // #{$root}__in-component-name
        "^\\." + BLOCK_NAME + BLOCK_TAIL + "?#{\\$root}" + BLOCK_TAIL + "$", // &#{$root}__element-mix
        "^\\." + BLOCK_NAME + BLOCK_TAIL + '?--' + VARIABLE + "$", // .variable-in--#{$modifier}
        "^&" + VARS_IN_MODIFIER + "$", // .vars-in-block--#{$modifier}-can-be-#{$multiple}
        "^&__" + BLOCK_NAME + VARS_IN_MODIFIER + "$", // .vars-in__element--#{$modifier}-can-#{$be}-multiple
        "^(.* )?svg$",
        "^(.* )?img$",
      ],
    },
  },
};
