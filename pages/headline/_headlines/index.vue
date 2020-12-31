<template>
  <v-container fill-height>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="12"
        sm="12"
      >
        <div>
          <v-breadcrumbs
            :items="headlineBreadcrumb"
            class="pl-0"
          >
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :href="item.slug"
                class="font-weight-bold"
              >
                <span class="purple--text text--darken-4"> {{ item.title.toUpperCase() }}</span>
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </div>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="start"
    >
      <v-col
        cols="10"
        md="8"
        sm="12"
      >
        <h2>
          <a
            :href="`${headline.url}`"
            target="_blank"
            class="blue-grey--text text--darken-1"
          >
            {{ headline.title }}
          </a>
        </h2>
        <div>

          <v-icon
            class="mr-1"
            color="blue-grey"
            small
          >
            mdi-home-city-outline
          </v-icon>
          <span
            v-if="headline.source"
            class="subheading blue-grey--text font-weight-bold mr-2 body-2"
          >{{ headline.source.name }}</span>
        </div>
        <span class="grey--text caption font-weight-bold">{{ headline.publishedAt }}</span>
        <v-card
          class="mx-auto mt-5"
          tile
          elevation="0"
        >
          <v-img :src="`${headline.urlToImage}`" />

          <p class="mt-3 body-1 grey--text">
            {{ headline.content }}
          </p>
          <v-card-actions class="pl-0 mt-3">
            <v-btn
              color="purple darken-4"
              dark
              width="120"
              height="50"
              elevation="1"
              @click="$router.go(-1)"
            >
              Back
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="2"
        md="4"
        sm="12"
        class="pl-5"
      >
        <h3 class="purple--text text--darken-1 text-uppercase mb-5 pt-3 font-weight-bold body-1">Top Stories</h3>
        <div>

          <v-card
            class="mx-auto main-feature-wrapper"
            flat
            tile
          >
            <v-list
              three-line
              class="py-0"
            >
              <template v-for="(story, i) in topStories">
                <v-list-item
                  :key="i"
                  class="px-0 mb-2 main-feature-content"
                >
                  <NuxtLink
                    :to="`/headline/${encodeURIComponent(story.title.toLowerCase())}`"
                    class="blue-grey--text"
                  >
                    <v-list-item-content class="py-2">
                      <v-list-item-subtitle class="caption text-uppercase font-weight-bold mb-2 blue--text text--darken-1">{{ story.source.name }}</v-list-item-subtitle>
                      <h4 class="font-weight-black">{{ story.title }}</h4>
                      <v-list-item-subtitle class="caption font-weight-medium mt-1 blue-grey--text">{{ story.publishedAt }}</v-list-item-subtitle>
                      <LazyAppExtraBookmark :headline="story" />
                    </v-list-item-content>
                  </NuxtLink>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable*/
import { mapGetters } from "vuex"
export default {
  layout: "default",
  transition: "slide-bottom",
  data () {
    return {
      headline: {}
    }
  },
  computed: {
    ...mapGetters("app-native", {
      topStories: "GET_TOP_STORIES"
    }),
    headlineBreadcrumb () {
      const allCountry = this.$store.getters["app-native/GET_ALL_COUNTRIES"]
      let breadcrumb = [{
        title: "headline",
        slug: "/"
      }]
      const country = {
        title: allCountry.filter(({ name }) => name === this.$store.getters["app-native/GET_COUNTRY"])[0].title,
        slug: "/"
      }
      const category = {
        title: this.$store.getters["app-native/GET_NEWS_CATEGORY"],
        slug: "/"
      }
      breadcrumb.push(country, category)
      return breadcrumb
    }
  },
  methods: {
    async fetchArticle () {
      const headlines = await this.$store.getters["app-native/GET_HEADLINES"]
      const bookmarks = await this.$store.getters["auth/getHeadlines"]
      const slug = this.$route.params.headlines

      // given based on query
      if (headlines.length) {
        const filtered = headlines.filter(item => item.title.toLowerCase().includes(slug))

        if (filtered.length > 0) {
          this.headline = filtered[0]
          return true
        }
      }
      // bookmark
      if (bookmarks.length) {
        const filtered = bookmarks.filter(item => item.title.toLowerCase().includes(slug))

        if (filtered.length > 0) {
          this.headline = filtered[0]
          return true
        }
      }

      this.$store.dispatch("app-various/setSnackbar", { status: true, timeout: 4000, message: `Article details not available.`, iconSuccess: false }, { root: true })
      return this.$router.push("/")

    }
  },
  created () {
    this.fetchArticle()
  },

}
</script>
