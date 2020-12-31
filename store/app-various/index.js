/*eslint-disable*/
export default {
  namespace: true,
  state: () => ({
    snackBarStatus: false,
    snackBarTimeout: 4000,
    snackBarMessage: "",
    snackBarIconSuccess: true,
    loader: false,
    userProfileDialog: false,
    myBookmark: false
  }),
  getters: {
    GET_SNACKBAR_STATUS: state => state.snackBarStatus,
    GET_SNACKBAR_TIMEOUT: state => state.snackBarTimeout,
    GET_SNACKBAR_MESSAGE: state => state.snackBarMessage,
    GET_SNACKBAR_ICON_SUCCESS: state => state.snackBarIconSuccess,
    GET_LOADER: state => state.loader,
    GET_USER_PROFILE_DIALOG: state => state.userProfileDialog,
    GET_MY_BOOKMARK: state => state.myBookmark
  },
  mutations: {
    settingSnackbar (state, payload) {
      const { status, timeout, message, iconSuccess } = payload
      state.snackBarStatus = status
      state.snackBarTimeout = timeout
      state.snackBarMessage = message
      state.snackBarIconSuccess = iconSuccess
    },
    setLoaderStatus (state) {
      state.loader = !state.loader
      console.log("set loader status")
    },
    setUserProfileDialog (state, status) {
      state.userProfileDialog = status
    },
    settingMyBookmark (state, status) {
      state.myBookmark = status
    }
  },
  actions: {
    setSnackbar ({ commit }, payload) {
      commit("settingSnackbar", payload)
    },
    setLoader ({ commit }) {
      commit("setLoaderStatus")
    },
    setUserProfileDialog ({ commit }, status) {
      commit("setUserProfileDialog", status)
    },
    setMyBookmark ({ commit }, status) {
      commit("settingMyBookmark", status)
    }
  }
}
