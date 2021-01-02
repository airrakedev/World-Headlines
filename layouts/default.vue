<template>
  <v-app dark>
    <!-- left drawer -->
    <!-- <LazyAppLayoutLeftDrawer /> -->
    <!-- navigation top bar -->
    <LazyAppLayoutAppbar />
    <!-- main wrapper -->
    <v-main class="mt-5 pt-5">
      <v-container class="mt-10 pt-5">
        <nuxt />
      </v-container>
    </v-main>
    <!-- right drawer -->
    <LazyAppLayoutRightDrawer />
    <!-- footer -->
    <LazyAppLayoutFooter />
    <LazyAppVariousSnackbar />
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayoutPage",
  data () {
    return {

      title: "Vuetify.js"
    }
  }
}
</script>
