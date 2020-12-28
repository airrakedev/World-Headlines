<template>
  <v-snackbar
    v-model="snackBarStatus"
    :timeout="snackBarTimeout"
    :multi-line="multiLine"
    color="purple darken-4"
  >
    <v-icon class="pr-2">{{ snackBarIconSuccess? "mdi-checkbox-marked-circle" : "mdi-close-circle-outline" }}</v-icon>
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
      snackBarMessage: "GET_SNACKBAR_MESSAGE",
      snackBarIconSuccess: "GET_SNACKBAR_ICON_SUCCESS"
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
