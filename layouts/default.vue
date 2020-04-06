<template>
  <v-app id="rentals">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10">
            <v-card color="transparent" flat>
              <v-toolbar dense>
                <v-img
                  class="mx-2"
                  src="https://cdn2.hubspot.net/hub/5670381/hubfs/May_2019/Ikos-Logo-New.png?width=110&name=Ikos-Logo-New.png"
                  max-height="40"
                  max-width="110"
                  contain
                />

                <v-spacer />

                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      text
                      small
                      v-on="on"
                    >
                      Services
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-btn text small>
                  About
                </v-btn>

                <v-btn text small>
                  Contact
                </v-btn>
              </v-toolbar>
              <nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  })
}
</script>

<style scoped>
  .v-content {
    background-image: url(https://i.imgur.com/4F8Po2D.jpg);
    background-size: cover;
  }
  .container {
    background-color: rgba(187, 114, 170, 0.85);
  }
  #rentals {
    border-radius: 5px;
  }
  .v-btn {
    text-transform: none;
  }
</style>
