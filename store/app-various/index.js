/*eslint-disable*/
export default {
  namespace: true,
  state: () => ({
    snackBarStatus: false,
    snackBarTimeout: 4000,
    snackBarMessage: ""
  }),
  getters: {
    GET_SNACKBAR_STATUS: state => state.snackBarStatus,
    GET_SNACKBAR_TIMEOUT: state => state.snackBarTimeout,
    GET_SNACKBAR_MESSAGE: state => state.snackBarMessage
  },
  mutations: {
    settingSnackbar (state, payload) {
      const { status, timeout, message } = payload
      state.snackBarStatus = status
      state.snackBarTimeout = timeout
      state.snackBarMessage = message
    },

  },
  actions: {

    setSnackbar ({ commit }, payload) {
      commit("settingSnackbar", payload)
      console.log(payload, "boom")
    }
  }
}
