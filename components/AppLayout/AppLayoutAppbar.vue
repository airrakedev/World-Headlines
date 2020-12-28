<template>
  <v-app-bar
    elevation="1"
    fixed
    flat
    color="white"
    class="top-app-bar"
    dense
  >

    <v-toolbar-title class="title mx-5 mt-2 font-weight-bold">
      <NuxtLink
        to="/"
        class="purple--text text--darken-4"
      >
        The Whisperer
      </NuxtLink>
    </v-toolbar-title>
    <v-spacer />
    <v-row
      justify="end"
      align="center"
      class="mt-3"
    >
      <div v-show="!isAuthenticated">
        <v-btn
          small
          elevation="1"
          rounded
          color="purple darken-4"
          dark
          class="caption font-weight-bold pa-4"
          @click="register"
        >
          <v-icon
            small
            class="pr-1"
          >
            mdi-account-edit-outline
          </v-icon>
          <span>Signup</span>
        </v-btn>
        <Nuxt-link
          to="/login"
          class="mx-4 body-1 font-weight-bold text-uppercase blue-grey--text darken-4"
        >
          Login
        </Nuxt-link>
      </div>

      <div v-show="isAuthenticated">
        <v-menu
          :close-on-content-click="true"
          :nudge-width="120"
          offset-y
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              class="pr-5"
              v-on="on"
            >
              <v-avatar
                size="50"
                class=""
              >
                <v-img
                  alt=""
                  :src="user.photoURL != null ? user.photoURL : 'https://instagram.inoutmkt.com.br/assets/img/no-avatar.png'"
                  :lazy-src="'https://instagram.inoutmkt.com.br/assets/img/no-avatar.png'"
                />
              </v-avatar>
              <span class="purple--text text--darken-4 font-weight-bold text-capitalize pl-2">
                {{ user.displayName != null? user.displayName : "Hello There!" }}
              </span>
            </div>
          </template>

          <v-card>
            <v-list-item-group>
              <v-list-item @click="$store.dispatch('app-various/setUserProfileDialog', true)">
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-account-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-weight-bold caption blue-grey--text text-darken-4">
                    Profile
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item
                v-show="isAuthenticated"
                @click="$store.dispatch('app-various/setMyBookmark', true)"
              >
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-bookmark-multiple-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-weight-bold caption blue-grey--text text-darken-4">
                    My Bookmark
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item @click="$store.dispatch('auth/logout')">
                <v-list-item-icon class="mr-3">
                  <v-icon color="warning">mdi-power</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-weight-bold caption blue-grey--text text-darken-4">Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </v-menu>
      </div>
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
                class="text-uppercase font-weight-bold  px-4"
                :class="country.name != getSelectedCountry? `caption  blue-grey--text text--darken-1` : `country-active`"
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
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      />
    </template>
    <LazyAppDialogUserProfile />
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "AppLayoutAppbar",
  data () {
    return {
      openProfile: false
    }
  },
  computed: {
    ...mapGetters("app-native", {
      getSelectedCountry: "GET_COUNTRY"
    }),
    ...mapGetters("app-various", {
      loading: "GET_LOADER"
    }),
    ...mapGetters("auth", {
      user: "getUser",
      isAuthenticated: "isAuthenticated"
    }),
    getNewsByCountries () {
      return this.$store.getters["app-native/GET_ALL_COUNTRIES"].filter(item => item.top)
    }

  },
  methods: {
    async selectCountry (country) {
      await this.$store.dispatch("app-native/changeCountry", country)
      await this.$store.dispatch("apiCall/apiQuery")
      this.$router.push("/")
    },
    register () {
      this.$router.push("/register")
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
