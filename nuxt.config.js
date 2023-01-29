/* eslint-disable semi */
/* eslint-disable comma-dangle */
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - Whisperer",
    title: "Whisperer",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Top Worlwide news headlines",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  target: "server",

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/main.scss", "~/assets/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/axios", { src: "~/plugins/persistedState" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/moment",
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy", "@nuxtjs/firebase"],

  axios: {
    proxy: true,
    credentials: true,
  },

  proxy: {
    "/news-feed/": {
      target:
        process.env.NEWS_API_URL || "https://newsapi.org/v2/top-headlines",
      pathRewrite: {
        "^/news-feed/": "",
      },
    },
  },

  firebase: {
    config: {
      apiKey: "AIzaSyCA-DBWYbtYcy5agmQ43SGnsI0af3Eb3GE",
      // authDomain: "Whisperer.firebaseapp.com",
      authDomain: "news-nuxt.firebaseapp.com",
      databaseURL: "<databaseURL>",
      // projectId: "Whisperer",
      projectId: "news-nuxt",
      // storageBucket: "Whisperer.appspot.com",
      storageBucket: "news-nuxt.appspot.com",
      messagingSenderId: "891396339315",
      appId: "1:891396339315:web:527ed76f83096e58c39c06",
    },
    services: {
      auth: {
        persistence: "local", // default
        initialize: {
          // onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
          onAuthStateChangedAction: "auth/onAuthStateChangedAction",
          subscribeManually: false,
        },
        ssr: true, // default
        emulatorPort: undefined,
        // emulatorPort: process.env.NODE_ENV === "development" ? 9099 : undefined,
        emulatorHost: "http://localhost",
      },
      firestore: {
        memoryOnly: false,
        enablePersistence: true,
        emulatorPort: undefined,
        emulatorHost: "localhost",
      },
    },
    lazy: false,
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      font: {
        family: "Quicksand",
      },
      icons: "mdi",
    },
  },

  env: {
    NEWS_API_KEY: "fc260dbc90004fb6bdd10fc07b07a5fb",
    // http://newsapi.org/v2/top-headlines?country=us&apiKey=fc260dbc90004fb6bdd10fc07b07a5fb
    NEWS_API_URL: "https://newsapi.org/v2/top-headlines",
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    },
  },
  router: {
    mode: "history",
  },
  pageTransition: "slide-bottom",
  layoutTransition: "slide-bottom",
};
