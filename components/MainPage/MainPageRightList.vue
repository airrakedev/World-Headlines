<template>
  <v-card
    class="mx-auto list-headline-wrapper"
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
          class="px-0 mb-2 list-headline-content"
        >
          <NuxtLink :to="slugUrl(headline.title)">
            <v-list-item-content class="py-2 list-">
              <v-list-item-subtitle class="caption text-uppercase font-weight-bold mb-2 purple--text text--darken-1">{{ headline.source.name }}</v-list-item-subtitle>
              <h4 class="font-weight-black  blue-grey--text text--darken-1">{{ headline.title }}</h4>
              <v-list-item-subtitle class="caption font-weight-medium mt-1 blue-grey--text">{{ headline.publishedAt }}</v-list-item-subtitle>

              <LazyAppExtraBookmark :headline="headline" />

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
  data () {
    return {
      positionFab: true
    }
  },
  computed: {
    ...mapGetters("app-native", {
      listHeadlines: "GET_LIST_HEADLINES"
    })
  },
  methods: {
    slugUrl (url) {
      return `/headline/${encodeURIComponent(url.toLowerCase())}`
    },
    async bookmarkHeadline (headline) {
      await this.$store.dispatch("apiCall/bookmarkHeadline", headline)
    }
  }

}
</script>

<style lang="scss">
.list-headline-wrapper {
  .list-headline-content {
    position: relative;

    &:first-child {
      .v-list-item__content {
        padding-top: 0 !important;
      }
    }

    // .bookmark-btn {
    //   position: absolute;
    //   top: -5px;
    //   right: 0;
    // }
  }
}
</style>
