import * as Cookies from "js-cookie"
export default {
  state: () => ({
    user: {
      uid: null,
      email: null,
      emailVerified: null,
      displayName: null,
      photoURL: null
    },
    authenticated: false,
    headlines: []

  }),
  getters: {
    getUser: state => state.user,
    isAuthenticated: state => state.authenticated,
    getHeadlines: state => state.headlines
  },
  mutations: {
  /*eslint-disable*/
    SET_HEADLINE (state, payload) {
      state.headlines = payload
    },
    UPDATE_AUTH_USER (state, payload) {
      const { displayName, photoURL } = payload
      state.user.displayName = displayName
      state.user.photoURL = photoURL
    },
    AUTH_USER (state, authUser) {
      const { uid, email, emailVerified, displayName, photoURL } = authUser
      state.user = { uid, email, emailVerified, displayName, photoURL }
      state.authenticated = true
    },
    DE_AUTH_USER (state) {
      state.user = {
        uid: null,
        email: null,
        emailVerified: null,
        displayName: null,
        photoURL: null
      }
      state.authenticated = false
    }

  },
  actions: {
    /*eslint-disable */
    updateHeadline ({ commit }, payload) {
      commit("SET_HEADLINE", payload)
    },

    onAuthStateChangedAction: ({ commit, dispatch }, { authUser, claims }) => {

      if (!authUser) {
        // claims = null
        // Perform logout operations
        commit("DE_AUTH_USER")

      } else {
        // Do something with the authUser and the claims object...
        console.log(authUser, "dispatch")
        commit("AUTH_USER", authUser)
        // dispatch users bookmark
        dispatch("apiCall/featchAllBookmark", null, { root: true })
      }
    },
    updateAuthUser ({ commit }, payload) {
      commit("UPDATE_AUTH_USER", payload)
    },

    async logout ({ state, commit }) {
      // remove listener
      commit("apiCall/RESET_STORE", null, { root: true })

      await this.$fire.auth.signOut()
      // empty all api fetch headlines
      commit("SET_HEADLINE", [])
      // remove cookies
      Cookies.remove("vuex", { path: "" })

      this.$router.push('/')
    }
  }
}
