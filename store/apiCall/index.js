
export default {
  namespace: true,
  state: () => ({
    listenerUnsubscribe: null

  }),
  getters: {},

  mutations: {
    SET_LISTENER_UNSUBSCRIBE (state, val) {
      state.listenerUnsubscribe = val
    },
    RESET_STORE (state) {
      state.listenerUnsubscribe()
    }
  },

  actions: {
    // remore users bookmark
    removeBookmarkHeadline ({ commit, dispatch, rootState, rootGetters }, headlineToRemove) {
      if (!rootGetters["auth/isAuthenticated"]) { return }

      const { email } = rootGetters["auth/getUser"]

      this.$fire.firestore.doc(`headlines/${email}/`).collection("bookmark").doc(headlineToRemove).delete()
        .then(() => {
          commit("app-various/settingSnackbar", { status: true, timeout: 4000, message: "Bookmark headlines succesfully deleted!", iconSuccess: true }, { root: true })
        })
        .catch(error => commit("app-various/settingSnackbar", { status: true, timeout: 4000, message: error.message, iconSuccess: false }, { root: true }))
    },

    // get all users bookmark
    async featchAllBookmark ({ commit, dispatch, rootState, rootGetters }) {
      // check if users is authenticated
      if (!rootGetters["auth/isAuthenticated"]) { return }

      try {
        const { email } = rootGetters["auth/getUser"]
        const headline = await this.$fire.firestore.doc(`headlines/${email}/`).collection("bookmark")
          .onSnapshot(querySnapshot => {
            const feed = []
            querySnapshot.forEach(doc => {
              feed.push(doc.data())
            })
            // commit("auth/SET_HEADLINE", feed, { root: true })
            dispatch("auth/updateHeadline", feed, { root: true })
          })

        // stop listener
        commit("SET_LISTENER_UNSUBSCRIBE", headline)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message, "Headlines realtime fetching got problems.")
      }
    },

    // bookmark headline
    async bookmarkHeadline ({ commit, rootState, rootGetters }, payload) {
      const { email } = rootGetters["auth/getUser"]

      // check if user is authenticated
      if (!rootGetters["auth/isAuthenticated"]) { return commit("app-various/settingSnackbar", { status: true, timeout: 5000, message: "You should Create an account or Login to your account.", iconSuccess: false }, { root: true }) }
      // set loader
      commit("app-various/setLoaderStatus", null, { root: true })

      try {
        const feedRef = await this.$fire.firestore.collection("headlines").doc(email).collection("bookmark").doc(payload.title)
        if (feedRef) {
          feedRef.set(payload)
          // off loader
          commit("app-various/setLoaderStatus", null, { root: true })
          // success snackbar
          commit("app-various/settingSnackbar", { status: true, timeout: 4000, message: "Bookmark headlines succesfully.", iconSuccess: true }, { root: true })
          return
        }
        commit("app-various/setLoaderStatus", null, { root: true })
        // success snackbar
        commit("app-various/settingSnackbar", { status: true, timeout: 4000, message: "Got problems", iconSuccess: false }, { root: true })
        return
      } catch (error) {
        commit("app-various/setLoaderStatus", null, { root: true })
        // success snackbar
        commit("app-various/settingSnackbar", { status: true, timeout: 4000, message: error.message, iconSuccess: false }, { root: true })
      }
    },

    async apiQuery ({ commit, rootGetters }) {
      try {
        /* eslint-disable */
        commit("app-various/setLoaderStatus", null, { root: true })
        const result = await this.$axios.get(`${rootGetters["app-native/GET_DEFAULT_ENDPOINT"]}?country=${rootGetters["app-native/GET_COUNTRY"]}&category=${rootGetters["app-native/GET_NEWS_CATEGORY"]}`)

        if (result) {

          const { articles } = result.data
          commit("app-native/setHeadlines", articles, { root: true })
          // loader
          commit("app-various/setLoaderStatus", null, { root: true })
          return articles
        }
      } catch (err) {
        commit("app-various/setLoaderStatus", null, { root: true })
        // return this.$nuxt.error({ statusCode: 404, message: err.message })
        return
      }
    },

    async apiSearch ({ dispatch, commit, rootGetters }, payload) {
      try {
        commit("app-various/setLoaderStatus", null, { root: true })
        const search = await this.$axios.get(`${rootGetters["app-native/GET_DEFAULT_ENDPOINT"]}?q=${payload}`)

        if (search.data.status !== "error") {
          commit("app-various/setLoaderStatus", null, { root: true })
          const { articles } = search.data

          if (articles.length < 1) {
            dispatch("app-various/setSnackbar", { status: true, timeout: 4000, message: `No article found for ${payload}.`, iconSuccess: false }, { root: true })
            return
          }

          commit("app-native/setHeadlines", articles, { root: true })
          return articles
        }

      } catch (err) {
        commit("app-various/setLoaderStatus", null, { root: true })
        return this.$nuxt.error({ statusCode: 404, message: err.message })
      }
    }
  }
}
