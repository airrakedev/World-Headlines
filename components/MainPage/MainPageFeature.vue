<template>
  <v-card
    class="mx-auto"
    flat
    tile
  >
    <NuxtLink :to="slugUrl(leadHeadline.title)">
      <v-img
        height="400"
        class="white--text align-end"
        :src="`${availableLeadImage(leadHeadline.urlToImage)}`"
        lazy-src="https://www.parksmarina.com/images/not_available.png"
        aspect-ratio="1"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            />
          </v-row>
        </template>

        <v-card-subtitle
          v-if="leadHeadline.source.name"
          class="py-0 font-weight-bold caption text-uppercase yellow--text text--darken-2"
        >
          <!-- Headlines -->
          {{ leadHeadline.source.name }}
        </v-card-subtitle>
        <v-card-title class="pt-1 font-weight-black">{{ leadHeadline.title }}</v-card-title>
        <v-card-subtitle
          v-if="leadHeadline.publishedAt"
          class="mb-3 caption pt-0 font-weight-light white--text"
        >
          <!-- Dec 19, 2020 -->
          {{ leadHeadline.publishedAt }}
        </v-card-subtitle>
      </v-img>
    </NuxtLink>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "MainPageFeature",
  computed: {
    ...mapGetters("app-native", {
      leadHeadline: "GET_LEAD_HEADLINE"
    })
  },
  methods: {
    availableLeadImage (image) {
      if (image) {
        return image
      }
      return "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png"
    },
    slugUrl (url) {
      return `/headline/${encodeURIComponent(url.toLowerCase())}`
    }
  }

}
</script>
