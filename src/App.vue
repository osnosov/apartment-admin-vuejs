<template>
  <v-app>
    <template v-if="!$route.meta.public">
      <app-sidebar class="app--drawer"></app-sidebar>
      <app-header />
      <v-content>
        <v-progress-linear :active="loading" class="mt-0 mb-0" :indeterminate="true" background-color="primary" color="accent" :height="4"></v-progress-linear>
        <router-view></router-view>
      </v-content>
    </template>
    <template v-else>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </template>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

import appSidebar from '@/components/Sidebar';
import appHeader from '@/components/Header.vue';

export default {
  components: {
    appSidebar,
    appHeader,
  },
  name: 'App',
  computed: {
    ...mapGetters(['loading', 'isAuthenticated', 'isProfileLoaded']),
  },
  methods: {},
  created() {
    window.getApp = this;
  },
  mounted() {
    if (this.isAuthenticated && !this.isProfileLoaded)
      this.$store.dispatch('USER_REQUEST');
  },
};
</script>
