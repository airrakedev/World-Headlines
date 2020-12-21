module.exports = {
  extends: [
    "stylelint-config-standard"
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "no-missing-end-of-source-newline": "off",
    "at-rule-no-unknown": [true, {
      ignoreAtRules: ["extend", "at-root", "debug", "warn", "error", "if", "else", "for", "each", "while", "mixin", "include", "content", "return", "function"]
    }]
  }
}
