<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        small
        class="bookmark-btn"
        v-bind="attrs"
        large
        v-on="on"
        @click.prevent="bookmarkHeadline(headline)"
      >
        <v-icon color="blue-grey darken-4">mdi-bookmark-check</v-icon>
      </v-btn>
    </template>
    <span>Bookmark Headline</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    headline: {
      type: Object,
      required: true
    }
  },
  methods: {
    async bookmarkHeadline (headline) {
      await this.$store.dispatch("apiCall/bookmarkHeadline", headline)
    }
  }
}
</script>
<style lang="scss">
.bookmark-btn {
  position: absolute;
  top: -10px;
  right: 0;
}
</style>
