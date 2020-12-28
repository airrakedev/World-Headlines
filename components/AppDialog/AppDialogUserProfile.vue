<template>

  <v-dialog
    v-model="userDialogStatus"
    max-width="600px"
  >
    <v-card class="user-profile-wrapper">
      <v-card-title class="purple darken-4">
        <span class="headline white--text">User Profile</span>
      </v-card-title>
      <v-card-text class="px-3">
        <v-container fill-height>
          <v-row
            jsutify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="pr-5"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  class="text-center"
                >
                  <v-avatar size="100">
                    <img
                      :src="user.photoURL!==null? user.photoURL : 'https://instagram.inoutmkt.com.br/assets/img/no-avatar.png'"
                      lazy-src="https://instagram.inoutmkt.com.br/assets/img/no-avatar.png"
                      alt="User profile avatar"
                    >
                  </v-avatar>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  class="pl-10"
                >
                  <div
                    v-show="user.displayName"
                    class="mb-2"
                  >
                    <v-icon
                      class="mr-1"
                      color="purple darken-4"
                    >
                      mdi-account-circle
                    </v-icon>
                    <span class="subheading font-weight-bold text-uppercase blue-grey--text text--darken-4">
                      {{ user.displayName }}
                    </span>
                  </div>
                  <div>
                    <v-icon
                      class="mr-1"
                      color="purple darken-4"
                    >
                      mdi-email
                    </v-icon>
                    <span class="subheading font-weight-bold text-lowercase blue-grey--text text--darken-4">{{ user.email }}</span>
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  class="pt-5"
                >
                  <label class="purple--text text--darken-4 font-weight-bold">
                    Update your name here
                  </label>
                  <v-text-field
                    v-model="fullname"
                    placeholder="Fullname"
                    solo
                    hide-details
                    flat
                    solo-inverted
                    class="mt-1"
                  />
                  <v-btn
                    class="mt-3"
                    dark
                    color="purple darken-4"
                    elevation="0"
                    @click="updateProfile"
                  >
                    <v-icon
                      class="pr-2"
                      small
                    >mdi-check-outline</v-icon>
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-card
                class="pa-2 text-center"
                elevation="1"
              >
                <h3 class="body-2 pb-3 pt-0 text-center text-uppercase blue-grey--text text--darken-4 font-weight-bold">
                  Pick your Avatar
                </h3>
                <v-row
                  justify="center"
                  align="center"
                >
                  <div
                    v-for="(avatar, n) in avatarList"
                    :key="n"
                    class="pa-1"
                  >
                    <v-avatar
                      size="70"
                      class="selected-avatar"
                      :color="whichSelectedAvatar===avatar? 'purple darken-4' : ''"
                      @click="selectedAvatar=avatar"
                    >
                      <v-img
                        alt=""
                        :src="avatar"
                        :lazy-src="avatar"
                      />
                    </v-avatar>
                  </div>
                </v-row>
                <div class="mt-2">
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        color="purple darken-4"
                        v-bind="attrs"
                        @click="randomAvatar"
                        v-on="on"
                      >
                        <v-icon>mdi-cached</v-icon>
                      </v-btn>
                    </template>
                    <span>Select More</span>
                  </v-tooltip>

                </div>
              </v-card>
            </v-col>

          </v-row>
        </v-container>

      </v-card-text>

    </v-card>
  </v-dialog>

</template>
<script>
export default {
  name: "AppDialogUserProfile",
  data () {
    return {
      avatarIcons: [],
      selectedAvatar: null,
      fullname: ""
    }
  },
  computed: {
    whichSelectedAvatar () {
      return this.selectedAvatar
    },
    user () {
      return this.$store.getters["auth/getUser"]
    },
    userDialogStatus: {
      get () {
        return this.$store.getters["app-various/GET_USER_PROFILE_DIALOG"]
      },
      set (val) {
        this.$store.dispatch("app-various/setUserProfileDialog", false)
      }
    },
    avatarList () {
      return this.avatarIcons
    }
  },
  created () {
    this.randomAvatar()
  },
  methods: {
    /* eslint-disable*/
    async updateProfile () {
      try {
        const user = await this.$fire.auth.currentUser
        if (user) {

          await user.updateProfile({
            displayName: this.fullname.length > 0 ? this.fullname : this.user.displayName,
            photoURL: this.selectedAvatar !== null ? this.selectedAvatar : this.user.photoURL
          })
          // update profile
          this.$store.dispatch("auth/updateAuthUser", user)
          // snackbar
          this.$store.dispatch("app-various/setSnackbar", { status: true, timeout: 4000, message: "You have successfully updated your profile", iconSuccess: true })
          this.$nuxt.refresh()
        }
      } catch (error) {
        console.log(error.message, "whats up")
        this.$store.dispatch("app-various/setSnackbar", { status: true, timeout: 4000, message: error.message, iconSuccess: false })
      }
    },

    randomAvatar () {
      const avatarList = []
      for (let n = 0;n < 6;n++) {
        avatarList.push(`https://avatars.dicebear.com/4.5/api/avataaars/${Math.floor((Math.random() * 100) + n)}.svg?h=100`)
      }
      this.avatarIcons = avatarList
    }
  }
}
</script>
<style lang="scss">
.user-profile-wrapper {
  .selected-avatar {
    cursor: pointer;
  }
}
</style>
