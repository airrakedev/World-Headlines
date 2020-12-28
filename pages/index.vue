<template>
  <v-container fill-height>
    <v-row
      justify="center"
      align="start"
    >
      <v-col
        cols="2"
        md="2"
        sm="4"
      >
        <LazyMainPageSideCategories />
      </v-col>
      <v-col
        cols="8"
        md="10"
        sm="8"
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
              cols="7"
              md="7"
              sm="9"
              class="pt-0"
            >
              <LazyMainPageFeature />
            </v-col>
            <v-col
              cols="5"
              md="5"
              sm="3"
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
              <h1 class="mt-5">
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
