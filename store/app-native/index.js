/* eslint-disable */
export default {
  namespace: true,
  state: () => ({
    newsByCountries: [
      {
        name: "ae",
        title: "United Arab Emirates",
        top: false
      },
      {
        name: "ar",
        title: "Argentina",
        top: false
      },
      {
        name: "at",
        title: "Austria",
        top: false
      }, {
        name: "au",
        title: "Australia",
        top: true
      },
      {
        name: "be",
        title: "Belgium",
        top: false
      },
      {
        name: "bg",
        title: "Bulgaria",
        top: false
      },
      {
        name: "br",
        title: "Brazil",
        top: false
      }, {
        name: "ca",
        title: "Canada",
        top: false
      },
      {
        name: "ch",
        title: "Switzerland",
        top: false
      }, {
        name: "cn",
        title: "China",
        top: true
      },
      {
        name: "co",
        title: "Colombia",
        top: false
      },
      {
        name: "cu",
        title: "Cuba",
        top: false
      },
      {
        name: "cz",
        title: "Czech Republic",
        top: false
      }, {
        name: "de",
        title: "Germany",
        top: false
      },
      {
        name: "eg",
        title: "Egypt",
        top: false
      }, {
        name: "fr",
        title: "France",
        top: false
      },
      {
        name: "gb",
        title: "United Kingdom",
        top: true
      },
      {
        name: "gr",
        title: "Greece",
        top: false
      }, {
        name: "hk",
        title: "Hong Kong",
        top: false
      }, {
        name: "hu",
        title: "Hungary",
        top: false
      },
      {
        name: "id",
        title: "Indonesia",
        top: false
      },
      {
        name: "ie",
        title: "Ireland",
        top: false
      },
      {
        name: "il",
        title: "Israel",
        top: false
      }, {
        name: "in",
        title: "India",
        top: false
      },
      {
        name: "it",
        title: "Italy",
        top: false
      }, {
        name: "jp",
        title: "Japan",
        top: true
      },
      {
        name: "kr",
        title: "Korea",
        top: false
      },
      {
        name: "lt",
        title: "Lithuania",
        top: false
      }, {
        name: "lv",
        title: "Latvia",
        top: false
      }, {
        name: "ma",
        title: "Morocco",
        top: false
      },
      {
        name: "mx",
        title: "Mexico",
        top: false
      },
      {
        name: "my",
        title: "Malaysia",
        top: false
      },
      {
        name: "ng",
        title: "Nigeria",
        top: false
      }, {
        name: "nl",
        title: "Netherlands",
        top: false
      },
      {
        name: "no",
        title: "Norway",
        top: false
      }, {
        name: "nz",
        title: "New Zealand",
        top: false
      },
      {
        name: "ph",
        title: "Philippines",
        top: true
      },
      {
        name: "pl",
        title: "Poland",
        top: false
      }, {
        name: "pt",
        title: "Portugal",
        top: false
      }, {
        name: "ro",
        title: "Romania",
        top: false
      },
      {
        name: "rs",
        title: "Serbia",
        top: false
      },
      {
        name: "ru",
        title: "Russia",
        top: true
      },
      {
        name: "sa",
        title: "Saudi Arabia",
        top: false
      }, {
        name: "se",
        title: "Sweden",
        top: false
      },
      {
        name: "sg",
        title: "Singapore",
        top: false
      }, {
        name: "si",
        title: "Slovenia",
        top: false
      },
      {
        name: "sk",
        title: "Slovakia",
        top: false
      },
      {
        name: "th",
        title: "Thailand",
        top: false
      },
      {
        name: "tr",
        title: "Turkey",
        top: true
      }, {
        name: "tw",
        title: "Taiwan",
        top: false
      },
      {
        name: "ua",
        title: "Ukraine",
        top: false
      },
      {
        name: "us",
        title: "United States",
        top: true
      }, {
        name: "ve",
        title: "Venezuela",
        top: false
      }, {
        name: "za",
        title: "South Africa",
        top: false
      }
    ],
    newsBycategories: [
      {
        name: "business",
        top: true,
        icon: "business"
      },
      {
        name: "entertainment",
        top: true,
        icon: "entertainment"
      },
      {
        name: "general",
        top: true,
        icon: "general"
      },
      {
        name: "health",
        top: true,
        icon: "health"
      },
      {
        name: "science",
        top: true,
        icon: "science"
      },
      {
        name: "sports",
        top: true,
        icon: "sports"
      },
      {
        name: "technology",
        top: true,
        icon: "technology"
      }
    ],
    country: "us",
    defaultEndpoint: "top-headlines",
    newsCategory: "general",
    headlines: [],
    leadHeadline: {},
    listHeadlines: [],
    moreHeadlines: []
  }),
  getters: {
    GET_ALL_COUNTRIES: state => state.newsByCountries,
    GET_ALL_NEWS_CATEGORIES: state => state.newsBycategories,
    GET_COUNTRY: state => state.country,
    GET_DEFAULT_ENDPOINT: state => state.defaultEndpoint,
    GET_NEWS_CATEGORY: state => state.newsCategory,
    GET_HEADLINES: state => state.headlines,
    GET_LEAD_HEADLINE: state => state.leadHeadline,
    GET_LIST_HEADLINES: state => state.listHeadlines,
    GET_MORE_HEADLINES: state => state.moreHeadlines
  },

  mutations: {
    setHeadlines (state, payload) {
      const result = payload.length

      if (result > 0) {
        state.headlines = payload
        state.leadHeadline = payload.slice(0, 1)[0]
      }

      if (result > 7) {
        state.listHeadlines = payload.slice(1, 5)
      }

      if (result > 8) {

        const remain = eval(result - 5)
        // check if the headline result is more than 10, where the remaining all headlines minus the leadHeadline
        // and the listheadline is still more 10, then we only get only 10 but it is less than 10 then we get the remaining headline for the moreheadlines
        state.moreHeadlines = payload.slice(5, (remain > 10) ? 17 : result)

      }
    },
    setCategory (state, payload) {
      state.newsCategory = payload
    },
    setCountry (state, payload) {
      state.country = payload
    }
  },
  actions: {
    changeCategory ({ commit }, payload) {
      commit("setCategory", payload)
    },
    changeCountry ({ commit }, payload) {
      commit("setCountry", payload)
    }
  }
}
