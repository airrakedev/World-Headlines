<template>
  <v-app-bar
    elevation="1"
    fixed
    flat
    color="white"
    class="top-app-bar"
    dense
  >

    <v-toolbar-title class="title mx-5 mt-2 font-weight-bold purple--text text--darken-4">
      The Whisperer
    </v-toolbar-title>
    <v-spacer />
    <v-row
      class="mt-5"
      align="center"
      justify="end"
    >
      <v-btn
        small
        elevation="1"
        rounded
        color="purple darken-4"
        dark
        class="caption font-weight-bold pa-4"
      >
        <v-icon
          small
          class="pr-1"
        >mdi-account-edit-outline</v-icon>
        <span>Signup</span>
      </v-btn>
      <a
        href="#"
        class="mx-4 body-1 font-weight-bold text-uppercase"
      > Login</a>
    </v-row>
    <template v-slot:extension>
      <v-container
        fill-height
        class="pa-0"
      >
        <v-row
          align="center"
          justify="center"
          class="mb-3"
        >
          <v-col
            cols="10"
            class="pa-0 text-center"
          >
            <div>
              <a
                v-for="(country,i) in getNewsByCountries"
                :key="i"
                href="#"
                class="text-uppercase caption font-weight-bold blue-grey--text text--darken-1 px-4"
                @click="selectCountry(country.name)"
              >{{ country.title }}</a>

              <LazyAppLayoutMenuMoreCountries />
            </div>
          </v-col>
          <v-col
            cols="2"
            class="pa-0"
          >
            <LazyAppLayoutMenuSearch />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppLayoutAppbar",
  computed: {
    getNewsByCountries () {
      return this.$store.getters["app-native/GET_ALL_COUNTRIES"].filter(item => item.top)
    }
  },
  methods: {
    async selectCountry (country) {
      await this.$store.dispatch("app-native/changeCountry", country)
      await this.$store.dispatch("apiCall/apiQuery")
    }
  }
}
</script>

<style lang="scss" scoped>
.top-app-bar {
  .more-country-icon {
    margin-bottom: 2px;
  }
}
</style>
