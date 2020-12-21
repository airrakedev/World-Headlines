module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended"
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    "quote-props": ["error", "as-needed"],
    quotes: [2, "double", "avoid-escape"],
    "arrow-parens": [2, "as-needed"],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off"
  }
}
