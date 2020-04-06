<template>
  <v-card class="mx-auto">
    <v-card-text>
      <v-row>
        <v-col cols="1">
          <v-icon>mdi-bed</v-icon>
        </v-col>
        <v-col cols="4">
          Bedrooms
        </v-col>
        <v-spacer />
        <v-col cols="1">
          {{ bedrooms }}
        </v-col>
        <v-col cols="4">
          <div>
            <v-btn small max-width="20" :disabled="bedrooms === 1" @click="updateBedroomsFilter(-1)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn small @click="updateBedroomsFilter(1)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col cols="1">
          <v-icon>mdi-paper-roll-outline</v-icon>
        </v-col>
        <v-col cols="4">
          Bathrooms
        </v-col>
        <v-spacer />
        <v-col cols="1">
          {{ bathrooms }}
        </v-col>
        <v-col cols="4">
          <div>
            <v-btn small max-width="20" :disabled="bathrooms === 1" @click="updateBathroomsFilter(-1)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn small @click="updateBathroomsFilter(1)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="onCancelFilter()">
        Cancel
      </v-btn>
      <v-btn color="purple darken-2" dark @click="onApplyFilter()">
        Apply
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RoomsFilter',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      filters: 'rentals/filters'
    }),
    bedrooms: {
      get () {
        return this.filters.roomsFilter.bedrooms
      }
    },
    bathrooms: {
      get () {
        return this.filters.roomsFilter.bathrooms
      }
    }
  },
  methods: {
    ...mapMutations({
      updateBedroomsFilter: 'rentals/updateBedroomsFilter',
      updateBathroomsFilter: 'rentals/updateBathroomsFilter',
      enableRoomsFilter: 'rentals/enableRoomsFilter',
      cancelRoomsFilter: 'rentals/cancelRoomsFilter',
      filterRentals: 'rentals/filterRentals'
    }),
    onApplyFilter () {
      this.enableRoomsFilter()
      this.filterRentals()
    },
    onCancelFilter () {
      this.cancelRoomsFilter()
      this.filterRentals()
    }
  }
}
</script>

<style scoped>

</style>
