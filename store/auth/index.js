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
    SET_HEADLINE (state, payload) {
      state.headlines = [...payload]
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
    bookmark_headline ({ commit }, payload) {
      commit("SET_HEADLINE", payload)
    },
    onAuthStateChangedAction: ({ commit }, { authUser, claims }) => {
      if (!authUser) {
        // claims = null
        // Perform logout operations
        commit("DE_AUTH_USER")
      } else {
        // Do something with the authUser and the claims object...
        console.log(authUser, "dispatch")
        commit("AUTH_USER", authUser)
      }
    },
    updateAuthUser ({ commit }, payload) {
      commit("UPDATE_AUTH_USER", payload)
    },

    async logout () {
      await this.$fire.auth.signOut()

      Cookies.remove("vuex", { path: "" })

      this.$router.push('/')
    }
  }
}
