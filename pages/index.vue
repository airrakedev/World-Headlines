<template>
  <v-container
    fill-height
    class="mt-5"
  >
    <v-row
      justify="center"
      align="start"
    >
      <v-col
        cols="2"
        md="2"
        class="hidden-sm-and-down"
      >
        <LazyMainPageSideCategories />
      </v-col>
      <v-col
        md="10"
        sm="12"
      >
        <v-container
          fill-height
          class="px-0"
        >
          <v-row
            justify="center"
            align="start"
          >
            <v-col
              md="7"
              sm="12"
              class="pt-0 mb-sm-4"
            >
              <LazyMainPageFeature />
            </v-col>
            <v-col
              md="5"
              sm="12"
              class="pt-0"
            >
              <LazyMainPageRightList />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
              sm="12"
              class=""
            >
              <h1 class="mt-5 text-md-left text-sm-center">
                More Headlines
              </h1>
            </v-col>
          </v-row>
          <LazyMainPageMoreHeadlines />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "DefaultPage",
  scrollToTop: true

}
</script>
