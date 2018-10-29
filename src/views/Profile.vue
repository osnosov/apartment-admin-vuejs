<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <h3>Profile</h3>
            <p>{{getProfile.firstName}} {{getProfile.lastName}}</p>
            <p>Email: {{getProfile.email}}</p>
            <p>Phone: {{getProfile.phoneNumber}}</p>
            <p>Role: {{getProfile.role}}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  mounted() {
    this.$store.dispatch('USER_REQUEST');
  },
};
</script>
