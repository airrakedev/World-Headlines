<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
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
        More
        <v-icon
          small
          color="light-blue darken-3"
          class="pl-1 more-country-icon"
        >
          mdi-arrow-right
        </v-icon>
      </a>

    </template>

    <v-card class="pa-5">
      <v-autocomplete
        v-model="country"
        :items="getNewsByCountries"
        item-text="title"
        item-value="name"
        cache-items
        background-color="teal lighten-2"
        flat
        hide-no-data
        hide-details
        color="blue-grey darken-2"
        class="font-weight-bold caption text-uppercase blue-grey--text"
        clearable
        placeholder="Select a country"
        solo-inverted
        dense
        @change="selectCountry($event)"
      />
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "AppLayoutMenuMoreCountries",
  data () {
    return {
      country: "",
      menu: false
    }
  },
  computed: {
    getNewsByCountries () {
      return this.$store.getters["app-native/GET_ALL_COUNTRIES"].filter(item => !item.top)
    }
  },
  methods: {
    /* eslint-disable */
    async selectCountry (country) {
      await this.$store.dispatch("app-native/changeCountry", country)
      await this.$store.dispatch("apiCall/apiQuery")
    }
  },
}
</script>

<style lang="scss" scoped>
.top-app-bar {
  .more-country-icon {
    margin-bottom: 2px;
  }
}
</style>
