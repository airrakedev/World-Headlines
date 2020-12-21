import AppNative from "./app-native"
import apiCall from "./apiCall"
import appVarious from "./app-various"

const actions = {
  async nuxtServerInit ({ state, commit, dispatch, rootState, rootGetters }, { $axios, redirect }) {
    // try {
    //   /* eslint-disable */
    //   const result = await $axios.get(`${rootGetters["app-native/GET_DEFAULT_ENDPOINT"]}?country=${rootGetters["app-native/GET_COUNTRY"]} `)
    //   // const result = await $axios.get()
    //   console.log(result.data, "boom")
    //   return result
    // } catch (error) {
    //   console.log(error, "has error")
    //   redirect("/error")
    // }
    await dispatch("apiCall/apiQuery", null, { root: true })
  }
}

export default {
  AppNative,
  apiCall,
  appVarious,
  actions
}
