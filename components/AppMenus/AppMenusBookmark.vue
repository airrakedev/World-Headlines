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
        <v-list-item-title v-if="item.action">
          <v-btn
            color="error"
            plain
            class="caption font-weight-bold pa-0"
            @click="removeHeadline"
          >{{ item.title }}</v-btn>
        </v-list-item-title>
        <v-list-item-title
          v-else
          class="text-uppercase caption font-weight-bold blue-grey--text text--darken-4"
        >{{ item.title }}</v-list-item-title>
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
        { title: "Preview", action: false },
        { title: "Remove", action: true }
      ],
      myBookmark: true
    }
  },
  methods: {
    /*eslint-disable */
    removeHeadline () {
      console.log("remove headline")
    }
  },
}
</script>
