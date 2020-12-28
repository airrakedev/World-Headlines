<template v-if="isAuthenticated">
  <v-navigation-drawer
    v-model="myBookmark"
    absolute
    temporary
  >
    <v-container v-if="!headlines.length">
      <v-row
        align="start"
        class="mt-5"
      >
        <v-card
          class="text-center pa-5"
          flat
        >
          <h3 class="blue-grey--text text--darken-4">
            No bookmark headlines available
          </h3>
          <v-list-item-avatar
            class="ma-0 mt-3"
            tile
            size="80"
          >
            <v-icon
              size="120"
              color="warning"
            >
              mdi-bookmark-remove
            </v-icon>
          </v-list-item-avatar>
        </v-card>
      </v-row>
    </v-container>
    <v-list
      v-if="!headlines.length"
      two-line
    >
      <v-subheader class="font-weight-bold purple--text text--darken-4">
        <v-icon
          class="mr-2"
          color="purple darken-4"
        >mdi-bookmark-multiple</v-icon>
        My Bookmark Articles
      </v-subheader>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-folder
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-bold blue-grey--text text--darken-4"
            v-text="item.title"
          />
          <v-list-item-subtitle class="purple--text text--darken-4 font-weight-bold caption">BBC</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!-- <v-icon color="blue-grey darken-4">mdi-dots-vertical</v-icon> -->

          <LazyAppMenusBookmark :headline="item.title" />
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppLayoutRightDrawer",
  data () {
    return {
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        }
      ]
    }
  },
  computed: {
    /*eslint-disable */
    headlines () {
      return this.$store.getters["auth/getHeadlines"]
    },
    isAuthenticated () {
      this.$store.getters["auth/isAuthenticated"]
    },
    myBookmark: {
      get: function () {
        return this.$store.getters["app-various/GET_MY_BOOKMARK"]
      },
      set: function (status) {
        this.$store.commit("app-various/settingMyBookmark", status)
      }
    }
  }
}
</script>
