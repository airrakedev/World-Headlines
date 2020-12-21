/* eslint-disable */
export default {
  namespace: true,
  state: () => ({

  }),
  getters: {},

  mutations: {

  },

  actions: {
    async apiQuery ({ commit, rootGetters }) {
      try {
        /* eslint-disable */
        const result = await this.$axios.get(`${rootGetters["app-native/GET_DEFAULT_ENDPOINT"]}?country=${rootGetters["app-native/GET_COUNTRY"]}&category=${rootGetters["app-native/GET_NEWS_CATEGORY"]}`)
        if (result) {
          const { articles } = result.data
          commit("app-native/setHeadlines", articles, { root: true })
          return articles
        }
      } catch (err) {
        return this.$nuxt.error({ statusCode: 404, message: err.message })
      }
    },

    async apiSearch ({ dispatch, commit, rootGetters }, payload) {
      try {
        const search = await this.$axios.get(`${rootGetters["app-native/GET_DEFAULT_ENDPOINT"]}?q=${payload}`)

        if (search.data.status !== "error") {
          const { articles } = search.data

          if (articles.length < 1) {
            dispatch("app-various/setSnackbar", { status: true, timeout: 4000, message: `No article found for ${payload}.` }, { root: true })
            return
          }

          commit("app-native/setHeadlines", articles, { root: true })
          return articles
        }

      } catch (err) {
        return this.$nuxt.error({ statusCode: 404, message: err.message })
      }
    }
  }
}
