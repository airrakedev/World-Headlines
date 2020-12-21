<template>
  <v-snackbar
    v-model="snackBarStatus"
    :timeout="snackBarTimeout"
    :multi-line="multiLine"
    color="purple darken-4"
  >
    <span
      class="font-weight-bold"
      v-text="snackBarMessage"
    />

  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "AppVariousSnackbar",
  data () {
    return {
      multiLine: true
    }
  },
  computed: {
    /* eslint-disable */
    ...mapGetters("app-various", {
      snackBarTimeout: "GET_SNACKBAR_TIMEOUT",
      snackBarMessage: "GET_SNACKBAR_MESSAGE"
    }),
    snackBarStatus: {
      get: function () {
        return this.$store.getters["app-various/GET_SNACKBAR_STATUS"]
      },
      set: function (status) {
        this.$store.commit("app-various/settingSnackbar", { status: false, timeout: 4000, message: "" })
      }
    }
  }
}
</script>
