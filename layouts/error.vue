<template>
  <v-container fill-height>
    <v-row
      justify="center"
      align="center"
    >
      <v-col md="6">
        <v-card elevation="2">
          <v-img
            v-if="error.statusCode === 404"
            class="white--text align-end"
            src="https://doyouconvert.com/wp-content/uploads/2018/04/404_Error.jpg"
          />
          <v-img
            v-else
            class="white--text align-end"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQURI_0Ln8TBdD9iliEmpe-XfnUewHAOnAuuA&usqp=CAU"
          />

          <v-card-text class="text-center px-5 body-1 pt-0 pb-5 mb-3 font-weight-bold blue-grey--text text--darken-1">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </v-card-text>
          <v-card-actions class="pt-0 pb-5">
            <v-row>
              <v-col class="text-center">
                <NuxtLink to="/">
                  <v-btn
                    tile
                    color="warning"
                  >
                    <v-icon left> mdi-arrow-left </v-icon>
                    Back Home
                  </v-btn>
                </NuxtLink>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ErrorPage",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
