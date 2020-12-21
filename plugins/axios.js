export default ({ $axios, redirect, env }) => {
  $axios.setBaseURL(env.NEWS_API_URL)
  // $axios.setBaseURL("https://newsapi.org/v2/top-headlines?country=us")
  // $axios.setHeader("Content-Type", "application/json")
  $axios.onRequest(config => {
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
