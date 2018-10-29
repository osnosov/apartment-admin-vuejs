<template>
  <v-toolbar color="primary" dark app fixed extended extension-height="4">
    <v-toolbar-side-icon @click.stop="handleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link class="home" tag="button" :to="{name: 'home'}">Apartments</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!isAuthenticated && !loading" flat dark :to="{name: 'login'}">Log In</v-btn>
      <v-btn v-if="!isAuthenticated && !loading" flat dark :to="{name: 'signup'}">Sign Up</v-btn>
      <v-menu v-if="isAuthenticated && isProfileLoaded" bottom left>
        <v-btn slot="activator" dark icon>
          <v-icon>person</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{getProfile.email}}</v-list-tile-title>
              <v-list-tile-sub-title>{{getProfile.role}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-tile :to="{name: 'profile'}">
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'appHeader',
  methods: {
    logout: function() {
      this.$store.dispatch('AUTH_LOGOUT');
    },
    handleDrawer() {
      window.getApp.$emit('EVENT_DRAWER_TOGGLED');
    },
  },
  computed: {
    ...mapGetters([
      'loading',
      'getProfile',
      'isAuthenticated',
      'isProfileLoaded',
    ]),
  },
};
</script>
