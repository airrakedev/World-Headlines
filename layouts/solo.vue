<template>
  <v-app dark>

    <v-main class="mt-5 pt-5">
      <v-container class="mt-10 pt-5">
        <nuxt />
      </v-container>
    </v-main>
    <LazyAppVariousSnackbar />
  </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
