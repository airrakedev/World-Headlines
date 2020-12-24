<template>
  <v-card
    class="mx-auto main-feature-wrapper"
    flat
    tile
  >
    <v-list
      three-line
      class="py-0"
    >
      <template v-for="(headline, i) in listHeadlines">
        <v-list-item
          :key="i"
          class="px-0 mb-2 main-feature-content"
        >
          <NuxtLink :to="slugUrl(headline.title)">
            <v-list-item-content class="py-2">
              <v-list-item-subtitle class="caption text-uppercase font-weight-bold mb-2 purple--text text--darken-1">{{ headline.source.name }}</v-list-item-subtitle>
              <h4 class="font-weight-black  blue-grey--text text--darken-1">{{ headline.title }}</h4>
              <v-list-item-subtitle class="caption font-weight-medium mt-1 blue-grey--text">{{ headline.publishedAt }}</v-list-item-subtitle>
            </v-list-item-content>
          </NuxtLink>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "MainPageRightList",
  computed: {
    ...mapGetters("app-native", {
      listHeadlines: "GET_LIST_HEADLINES"
    })
  },
  methods: {
    /* eslint-disable*/
    slugUrl (url) {
      return `/headline/${encodeURIComponent(url.toLowerCase())}`
    }
  }

}
</script>

<style lang="scss">
.main-feature-wrapper {
  .main-feature-content {
    &:first-child {
      .v-list-item__content {
        padding-top: 0 !important;
      }
    }
  }
}
</style>
