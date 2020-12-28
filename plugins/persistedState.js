import createPersistedState from "vuex-persistedstate"
import * as Cookies from "js-cookie"
import cookie from "cookie"

const dateToday = new Date()
const today = dateToday.setTime(dateToday.getTime() + 1 * 3600 * 1000)

export default ({ store, req, isDev }) => {
  createPersistedState({
    paths: ["auth"],
    storage: {
      getItem: key => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || "")[key],
      setItem: (key, value) => Cookies.set(key, value, { expires: today, secure: !isDev, path: "" }),
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}
