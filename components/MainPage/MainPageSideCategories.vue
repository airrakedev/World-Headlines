<template>
  <v-card
    color="grey lighten-4"
    elevation="0"
    class="side-categories-wrapper"
  >
    <v-list
      v-for="(category, i) in getAllNewsCategories"
      :key="i"
      class="py-0 side-categories-list"
    >
      <v-list-item
        class="py-1 px-1"
        :class="getSelectedCategory != category.name? `` : `category-active`"
        @click.prevent="changeCategory(category.name)"
      >
        <v-list-item-avatar class="ma-0 mr-2 mt-0 pa-2">
          <v-img
            contain
            :lazy-src="require(`~/assets/svg/${category.icon}.svg`)"
            :src="require(`~/assets/svg/${category.icon}.svg`)"
            width="12"
          />
        </v-list-item-avatar>
        <v-list-item-content class="">
          <v-list-item-title class="caption font-weight-bold text-uppercase app-default-color">{{ category.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />

    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "MainPageSideCategories",
  data () {
    return {

    }
  },
  computed: {
    getAllNewsCategories () {
      return this.$store.getters["app-native/GET_ALL_NEWS_CATEGORIES"]
    },
    getSelectedCategory () {
      return this.$store.getters["app-native/GET_NEWS_CATEGORY"]
    }
  },
  methods: {
    async changeCategory (category) {
      await this.$store.dispatch("app-native/changeCategory", category)
      await this.$store.dispatch("apiCall/apiQuery")
    }
  }

}
</script>
<style lang="scss">
.side-categories-wrapper {
  .side-categories-list {
    border-left: $border-left;
    border-right: $border-right;

    &:first-child {
      border-top: $border-top;
    }

    .app-default-color {
      @extend %default-color;
    }

    svg {
      fill: red;
    }
  }
}
</style>
