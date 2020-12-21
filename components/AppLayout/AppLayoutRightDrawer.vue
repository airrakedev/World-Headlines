<template>
  <v-navigation-drawer
    v-model="drawer"
    class="mt-5 pt-5"
    :mini-variant="miniVariant"
    :clipped="clipped"
    app
    floating
  >
    <v-list class="mt-2 pt-5">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppLayoutRightDrawer",
  data () {
    return {
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        }
      ],
      clipped: true,
      drawer: false,
      miniVariant: false
    }
  }
}
</script>
