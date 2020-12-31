export default ({ $axios, redirect, env }) => {
  $axios.setBaseURL(env.NEWS_API_URL)
  $axios.setHeader("Access-Control-Allow-Origin", "*")

  $axios.onRequest(config => {
    config.headers.crossorigin = true
    config.headers["Content-Type"] = "application/json"
    config.headers["X-Api-Key"] = env.NEWS_API_KEY
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect("/400")
    }
  })
}
