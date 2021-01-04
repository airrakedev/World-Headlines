<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    elevation="1"
    tile
    transition="slide-y-transition"
    bottom
    max-height="300"
  >
    <template v-slot:activator="{ on, attrs }">
      <a
        href="#"
        v-bind="attrs"
        class="text-uppercase caption font-weight-bold light-blue--text text--darken-3 pl-3"
        v-on="on"
      >

        Headlines Category
      </a>

    </template>

    <v-card class="pa-5">
      <v-autocomplete
        v-model="category"
        :items="getNewsByCategories"
        item-text="name"
        item-value="name"
        cache-items
        background-color="teal lighten-2"
        flat
        hide-no-data
        hide-details
        color="blue-grey darken-2"
        class="font-weight-bold caption text-uppercase blue-grey--text"
        clearable
        placeholder="Select a Category"
        solo-inverted
        dense
        @change="selectcategory($event)"
      />
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "AppLayoutMenuMoreCountries",
  data () {
    return {
      category: "",
      menu: false
    }
  },
  computed: {
    getNewsByCategories () {
      return this.$store.getters["app-native/GET_ALL_NEWS_CATEGORIES"]
    }
  },
  methods: {
    /* eslint-disable */
    async selectcategory (category) {
      this.menu = false
      await this.$store.dispatch("app-native/changeCategory", category)
      await this.$store.dispatch("apiCall/apiQuery")

      this.$router.push("/")
    }
  },
}
</script>

<style lang="scss" scoped>
.top-app-bar {
  .more-category-icon {
    margin-bottom: 2px;
  }
}
</style>
