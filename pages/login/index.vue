<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="6"
        md="5"
        sm="6"
      >

        <v-card
          elevation="2"
          class="pa-5"
        >
          <h2 class="text-center purple--text text--darken-4 mb-3 mt-3">Login your Account</h2>
          <form
            class="pa-5 pb-0"
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="user.email"
              :error-messages="emailErrors"
              color="purple darken-4"
              placeholder="Email"
              prepend-inner-icon="mdi-email-outline"
              clearable
              solo
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            />
            <v-text-field
              v-model="user.password"
              :type="showPassword ? `text` : `password`"
              :error-messages="passwordErrors"
              placeholder="Password"
              color="purple darken-4"
              clearable
              :counter="20"
              solo
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              @click:append="showPassword = !showPassword"
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            />
            <div class="text-center body-2">
              Don't have an account?<NuxtLink to="/register">
                Signup here
              </NuxtLink>
            </div>
            <div class="text-center mt-3">
              <v-btn
                type="submit"
                light
                color="purple darken-4"
                elevation="1"
                height="45"
                width="130"
                :disabled="disableSubmit"
                class="white--text"
              >
                Signin
              </v-btn>

            </div>
            <div class="text-center mt-1">
              <NuxtLink
                to="/"
                class="caption font-weight-bold text-uppercase"
              >
                Back Home

              </NuxtLink>
            </div>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, maxLength, minLength, email } from "vuelidate/lib/validators"

export default {
  name: "Register",
  middleware: "auth",
  mixins: [validationMixin],
  layout: "solo",
  transition: "slide-bottom",

  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(4), maxLength: maxLength(20) }
    }
  },

  data: () => ({
    user: {
      email: "",
      password: ""
    },
    showPassword: false,
    disableSubmit: false

  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.user.email.$dirty) { return errors }
      !this.$v.user.email.email && errors.push("Must be valid email")
      !this.$v.user.email.required && errors.push("Email is required")
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.user.password.$dirty) { return errors }
      !this.$v.user.password.maxLength && errors.push("Password should be less than 20 characters")
      !this.$v.user.password.required && errors.push("Password is required")
      return errors
    }
  },

  methods: {
    /*eslint-disable*/
    async submit () {
      this.$v.$touch()

      if (!this.$v.$error && !this.$v.$anyError) {
        this.disableSubmit = true
        try {
          await this.$fire.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(user => {
              this.disableSubmit = false
              this.$store.dispatch("app-various/setSnackbar", { status: true, timeout: 5000, message: "You're sign in!", iconSuccess: true })
              // set user auth
              this.$store.dispatch("auth/onAuthStateChangedAction", user)
              // route back
              this.$router.push("/")
              // clear input content
              this.user = {
                email: "",
                passwor: ""
              }
            })
            .catch(error => {
              this.disableSubmit = false
              this.$store.dispatch("app-various/setSnackbar", { status: true, timeout: 5000, message: error.message, iconSuccess: false })
            })
        } catch (error) {
          this.disableSubmit = false
          console.log(error.message, "error")
        }
      }
    }
  }
}
</script>
