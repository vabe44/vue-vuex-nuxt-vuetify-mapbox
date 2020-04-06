<template>
  <v-card class="mx-auto">
    <v-card-text>
      <v-container fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="6">
            Dishwasher
          </v-col>
          <v-spacer />
          <v-col cols="2">
            {{ dishWasher ? 'Yes' : 'No' }}
          </v-col>
          <v-col cols="2">
            <v-switch v-model="dishWasher" value="dishWasher" />
          </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" justify="center" dense>
          <v-col cols="6">
            Garbage
          </v-col>
          <v-spacer />
          <v-col cols="2">
            {{ garbage ? 'Yes' : 'No' }}
          </v-col>
          <v-col cols="2">
            <v-switch v-model="garbage" value="garbage" />
          </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" justify="center" dense>
          <v-col cols="6">
            Gas
          </v-col>
          <v-spacer />
          <v-col cols="2">
            {{ gas ? 'Yes' : 'No' }}
          </v-col>
          <v-col cols="2">
            <v-switch v-model="gas" value="gas" />
          </v-col>
        </v-row>
      </v-container>
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
  name: 'PoliciesFilter',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      filters: 'rentals/filters'
    }),
    dishWasher: {
      get () {
        return this.filters.policiesFilter.dishWasher
      },
      set (value) {
        this.updateDishWasherPolicyFilter(value)
      }
    },
    garbage: {
      get () {
        return this.filters.policiesFilter.garbage
      },
      set (value) {
        this.updateGarbagePolicyFilter(value)
      }
    },
    gas: {
      get () {
        return this.filters.policiesFilter.gas
      },
      set (value) {
        this.updateGasPolicyFilter(value)
      }
    }
  },
  methods: {
    ...mapMutations({
      updateDishWasherPolicyFilter: 'rentals/updateDishWasherPolicyFilter',
      updateGarbagePolicyFilter: 'rentals/updateGarbagePolicyFilter',
      updateGasPolicyFilter: 'rentals/updateGasPolicyFilter',
      cancelPoliciesFilter: 'rentals/cancelPoliciesFilter',
      enablePoliciesFilter: 'rentals/enablePoliciesFilter',
      filterRentals: 'rentals/filterRentals'
    }),
    onApplyFilter () {
      this.enablePoliciesFilter()
      this.filterRentals()
    },
    onCancelFilter () {
      this.cancelPoliciesFilter()
      this.filterRentals()
    }
  }
}
</script>

<style lang="scss">
  .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
  }

  .v-input--switch {
    .v-messages {
      display: none;
    }
  }
</style>
