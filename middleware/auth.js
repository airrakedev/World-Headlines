export default function ({ store, redirect }) {
  /* eslint-disable*/
  // is authenticated
  if (store.getters["auth/isAuthenticated"]) return redirect("/")
  // not authenticated
  if (store.getters["auth/isAuthenticated"]) return redirect("/login")

}
