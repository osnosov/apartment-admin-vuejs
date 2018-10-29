<template>
  <v-navigation-drawer fixed app v-model="drawer">
    <v-list dense>
      <template v-for="item in items">
        <v-list-tile :key="item.text" :to="{name: item.component}">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'appSidebar',
  data: () => ({
    drawer: true,
    items: [
      { icon: 'home', text: 'Home', component: 'home' },
      { icon: 'people', text: 'Profile', component: 'profile' },
    ],
  }),
  created() {
    window.getApp.$on('EVENT_DRAWER_TOGGLED', () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>
