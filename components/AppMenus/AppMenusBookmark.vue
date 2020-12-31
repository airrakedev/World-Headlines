<template>
  <!-- <div class="text-center"> -->
  <v-menu
    origin="center center"
    transition="scale-transition"
    :close-on-content-click="myBookmark"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="purple darken-4"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        class="text-center"
      >
        <v-list-item-title v-if="item.remove">
          <v-btn
            color="error"
            plain
            class="caption font-weight-bold pa-0"
            @click="removeHeadline"
          >
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-list-item-title>
        <NuxtLink :to="slugUrl(headline)">
          <v-list-item-title
            v-if="item.preview"
            class="text-uppercase caption font-weight-bold blue-grey--text text--darken-4"
          >
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item-title>
        </NuxtLink>
      </v-list-item>
    </v-list>
  </v-menu>
  <!-- </div> -->

</template>

<script>
export default {
  props: {
    headline: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      items: [
        { title: "Preview", preview: true, icon: "mdi-eye-settings-outline" },
        { title: "Remove", remove: true, icon: "mdi-delete-forever-outline" }
      ],
      myBookmark: true
    }
  },
  methods: {
    /*eslint-disable */
    async removeHeadline () {
      await this.$store.dispatch("apiCall/removeBookmarkHeadline", this.headline)
      this.$router.push("/")
    },
    slugUrl (url) {
      return `/headline/${encodeURIComponent(url.toLowerCase())}`
    }
  },
}
</script>
