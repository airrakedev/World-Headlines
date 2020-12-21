export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - news-nuxt",
    title: "news-nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/main.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/axios"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios"],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      font: {
        family: "Quicksand"
      },
      icons: "mdi"
    }
  },

  env: {
    NEWS_API_KEY: "fc260dbc90004fb6bdd10fc07b07a5fb",
    // http://newsapi.org/v2/top-headlines?country=us&apiKey=fc260dbc90004fb6bdd10fc07b07a5fb
    NEWS_API_URL: "http://newsapi.org/v2/"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  router: {
    mode: "history"
  },
  layoutTransition: {
    name: "layout",
    mode: "out-in"
  }
}
