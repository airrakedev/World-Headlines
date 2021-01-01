<template>
  <v-row class="mt-4">
    <template v-for="(headline, i) in moreHeadlines">
      <v-col
        :key="i"
        cols="3"
        md="4"
        sm="6"
      >
        <v-card
          tile
          flat
        >
          <NuxtLink :to="`/headline/${encodeURIComponent(headline.title.toLowerCase())}`">
            <v-card-subtitle class="purple--text text--darken-4 pl-0 text-uppercase font-weight-black pb-2 pt-0">
              {{ headline.source.name }}
            </v-card-subtitle>
            <v-img
              v-if="headline.urlToImage"
              height="200"
              class="white--text align-end"
              :src="`${headline.urlToImage}`"
              :lazy-src="`${headline.urlToImage}`"
              aspect-ratio="1"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  />
                </v-row>
              </template>
            </v-img>
            <v-img
              v-else
              height="200"
              class="white--text align-end"
              src="https://lh3.googleusercontent.com/proxy/Nhgbg4_XzHoQ32vdmcNjmBzUV9iWrCdzXhiPRkyuLhAUZjHsv4F8n6uluKVj8LoR1cWCYj3bMdsg9I4oRLy0HI-eo4oTIEhWqunHpQVl5tafNeEZxsZ5l6hpfiM5KiI1Tg"
              lazy-src="https://lh3.googleusercontent.com/proxy/Nhgbg4_XzHoQ32vdmcNjmBzUV9iWrCdzXhiPRkyuLhAUZjHsv4F8n6uluKVj8LoR1cWCYj3bMdsg9I4oRLy0HI-eo4oTIEhWqunHpQVl5tafNeEZxsZ5l6hpfiM5KiI1Tg"
              aspect-ratio="1"
            />

            <h4 class="mt-3 blue-grey--text text--darken-1">
              {{ headline.title }}
            </h4>
            <v-card-subtitle class="pl-0 pt-1 caption font-weight-medium blue-grey--text">
              {{ formatDate(headline.publishedAt) }}
              <LazyAppExtraBookmark :headline="headline" />
            </v-card-subtitle>
          </NuxtLink>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "MainPageMoreHeadlines",
  computed: {
    ...mapGetters("app-native", {
      moreHeadlines: "GET_MORE_HEADLINES"
    })
  },
  methods: {
    formatDate (value) {
      if (!value) { return "" }
      return this.$moment(value).format("MMM Do YY")
    }
  }
}
</script>
