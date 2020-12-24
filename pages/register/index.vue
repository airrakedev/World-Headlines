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
          <h2 class="text-center purple--text text--darken-4 mb-3 mt-3">Create your Account</h2>
          <form
            class="pa-5 pb-0"
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="user.name"
              :error-messages="nameErrors"
              placeholder="Fullname"
              solo
              color="purple darken-4"
              prepend-inner-icon="mdi-account-circle-outline"
              clearable
              @input="$v.user.name.$touch()"
              @blur="$v.user.name.$touch()"
            />
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
            <v-text-field
              v-model="user.passwordConfirm"
              :type="showConfirm ? `text` : `password`"
              :error-messages="confirmPasswordErrors"
              placeholder="Confirm password"
              color="purple darken-4"
              clearable
              :counter="20"
              :append-icon="showConfirm ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              solo
              prepend-inner-icon="mdi-lock-check-outline"
              @click:append="showConfirm = !showConfirm"
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            />
            <div class="text-center body-2">
              Already have an account?<NuxtLink to="/login">
                Log In
              </NuxtLink>
            </div>
            <div class="text-center mt-3">
              <v-btn
                type="submit"
                dark
                color="purple darken-4"
                elevation="1"
                height="45"
                width="130"
              >
                Register
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
import { required, maxLength, minLength, email, sameAs } from "vuelidate/lib/validators"

export default {
  name: "Register",
  mixins: [validationMixin],
  layout: "solo",
  transition: "slide-bottom",

  validations: {
    user: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(4), maxLength: maxLength(20) },
      passwordConfirm: { sameAsPassword: sameAs("password") }
    }
  },

  data: () => ({
    user: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    },
    showPassword: false,
    showConfirm: false

  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.user.name.$dirty) { return errors }

      !this.$v.user.name.required && errors.push("Name is required.")
      return errors
    },
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
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.user.passwordConfirm.$dirty) { return errors }
      !this.$v.user.passwordConfirm.sameAsPassword && errors.push("Please confirm your password.")
      return errors
    }
  },

  methods: {
    /*eslint-disable*/
    submit () {
      this.$v.$touch()

      if (!this.$v.$error && !this.$v.$anyError) {
        console.log(this.$v, "in")
      }

    }

  }
}
</script>
