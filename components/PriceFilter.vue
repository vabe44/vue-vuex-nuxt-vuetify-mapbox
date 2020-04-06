<template>
  <v-card class="mx-auto">
    <v-card-text>
      <div>
        <span>Average rental price in the Pittsburgh area is </span>
        <span class="font-weight-black">${{ averagePrice }}</span>
      </div>
      <v-range-slider
        v-model="priceRange"
        min="300"
        max="3500"
        step="50"
        :validate-on-blur="true"
      />
      <div class="font-weight-black subtitle-1">
        ${{ priceRange[0] }} - ${{ priceRange[1] }}
        {{ priceRange[1] === 3500 ? '+' : '' }}
      </div>
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
  name: 'PriceFilter',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      filters: 'rentals/filters',
      averagePrice: 'rentals/averagePrice'
    }),
    priceRange: {
      get () {
        return this.filters.priceFilter.priceRange
      },
      set (value) {
        this.updatePriceRange(value)
      }
    }
  },
  methods: {
    ...mapMutations({
      updatePriceRange: 'rentals/updatePriceRange',
      cancelPriceRangeFilter: 'rentals/cancelPriceRangeFilter',
      enablePriceRangeFilter: 'rentals/enablePriceRangeFilter',
      filterRentals: 'rentals/filterRentals'
    }),
    onApplyFilter () {
      this.enablePriceRangeFilter()
      this.filterRentals()
    },
    onCancelFilter () {
      this.cancelPriceRangeFilter()
      this.filterRentals()
    }
  }
}
</script>

<style scoped>

</style>
