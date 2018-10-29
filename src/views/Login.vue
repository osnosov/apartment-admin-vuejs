<template>
  <v-container fluid>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm10 md4 mt-3>
        <v-form>
          <v-layout column>
            <v-flex>
              <v-alert color="error" icon="warning" dismissible outline @input="onClose" :value="error">
                {{ errMessage }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field prepend-icon="person" name="login" :rules="emailRules" label="Enter your e-mail address" type="text" v-model="email"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field :append-icon="showPassword ? 'visibility_off' : 'visibility'" id="password" prepend-icon="lock" :rules="passwordRules" counter hint="At least 4 characters" value="" name="password" label="Enter your password" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" v-model="password"></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-3>
              <v-btn block color="primary" @click="login" :loading="loading" :disabled="loading">Login</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    showPassword: false,
    passwordRules: [
      v => !!v || 'The password field is required',
      v => v.length >= 4 || 'Min 4 characters',
    ],
    emailRules: [
      v => !!v || 'The email field is required',
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'E-mail must be valid',
    ],
    email: '',
    password: '',
  }),
  methods: {
    goToSignUp() {
      this.$router.push({ name: 'signup' });
    },
    login: function() {
      const { email, password } = this;
      this.$store.dispatch('AUTH_REQUEST', { email, password });
    },
    onClose() {
      this.$store.commit('AUTH_CLEAR_ERROR', null);
    },
  },
  computed: {
    ...mapGetters(['loading', 'error', 'errMessage']),
  },
};
</script>
