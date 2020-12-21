<template>
  <v-menu
    v-model="searchMenu"
    :close-on-content-click="false"
    offset-y
    elevation="1"
    tile
    transition="slide-y-transition"
    bottom
    class="memu-search-box-wrapper"
  >
    <template v-slot:activator="{ on, attrs }">
      <a
        href="#"
        v-bind="attrs"
        class="text-uppercase caption font-weight-bold blue-grey--text text--darken-1 pl-3"
        v-on="on"
      >
        Search
        <v-icon
          small
          color="blue-grey darken-1"
          class="pl-1 more-country-icon"
        >
          mdi-magnify
        </v-icon>
      </a>
    </template>

    <v-card
      class="pa-5"
      width="400"
    >
      <v-text-field
        v-model="searchString"
        placeholder="Search headlines..."
        solo-inverted
        flat
        hide-details
        background-color="cyan darken-3"
        prepend-inner-icon="mdi-magnify"
        color="white"
        class="menu-search-box"
        @keyup.enter="searchHeadlines($event.target.value)"
      />
    </v-card>
  </v-menu>
</template>

<script>
/* eslint-disable*/

export default {
  name: "AppLayoutMenuSearch",
  data () {
    return {
      searchMenu: false,
      searchString: ""
    }
  },

  methods: {
    async searchHeadlines (searchTerm) {
      this.searchMenu = false
      await this.$store.dispatch("apiCall/apiSearch", this.searchString)
      this.searchString = ""
    }
  },
}
</script>
