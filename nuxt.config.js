
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
  css: ["~/assets/main.scss", "~/assets/main.css"],

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
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/firebase"
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyCA-DBWYbtYcy5agmQ43SGnsI0af3Eb3GE",
      authDomain: "news-nuxt.firebaseapp.com",
      databaseURL: "<databaseURL>",
      projectId: "news-nuxt",
      storageBucket: "news-nuxt.appspot.com",
      messagingSenderId: "891396339315",
      appId: "1:891396339315:web:527ed76f83096e58c39c06",
      measurementId: "<measurementId>"
    },
    services: {
      auth: {
        persistence: "local", // default
        initialize: {
          onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
          onAuthStateChangedAction: "onAuthStateChangedAction",
          subscribeManually: false
        },
        ssr: false, // default
        // emulatorPort: 9099,
        emulatorPort: process.env.NODE_ENV === "development" ? 9099 : undefined,
        emulatorHost: "http://localhost"
      },
      firestore: true // Just as example. Can be any other service.
    },
    lazy: true

  },

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
  pageTransition: "slide-bottom",
  layoutTransition: "slide-bottom"

}
