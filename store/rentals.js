import RentalService from '../services/RentalService'

export const state = () => ({
  rentals: [],
  filteredRentals: [],
  selectedRental: null,
  filters: {
    priceFilter: {
      active: false,
      priceRange: [300, 3500]
    },
    roomsFilter: {
      active: false,
      bedrooms: 1,
      bathrooms: 1
    },
    policiesFilter: {
      active: false,
      dishWasher: false,
      garbage: false,
      gas: false
    }
  }
})

export const mutations = {
  SET_RENTALS (state, rentals) {
    state.rentals = rentals.data.filter(r => r.attributes.city === 'Pittsburgh')
    state.filteredRentals = state.rentals
  },
  setSelectedRental (state, value) {
    state.selectedRental = value
  },
  updatePriceRange (state, value) {
    state.filters.priceFilter.priceRange = value
  },
  updateBedroomsFilter (state, value) {
    state.filters.roomsFilter.bedrooms = state.filters.roomsFilter.bedrooms + value
  },
  updateBathroomsFilter (state, value) {
    state.filters.roomsFilter.bathrooms = state.filters.roomsFilter.bathrooms + value
  },
  updateDishWasherPolicyFilter (state, value) {
    state.filters.policiesFilter.dishWasher = value
  },
  updateGarbagePolicyFilter (state, value) {
    state.filters.policiesFilter.garbage = value
  },
  updateGasPolicyFilter (state, value) {
    state.filters.policiesFilter.gas = value
  },
  enablePriceRangeFilter (state) {
    state.filters.priceFilter.active = true
  },
  cancelPriceRangeFilter (state) {
    state.filters.priceFilter.active = false
  },
  togglePriceRangeFilter (state) {
    state.filters.priceFilter.active = !state.filters.priceFilter.active
  },
  enableRoomsFilter (state) {
    state.filters.roomsFilter.active = true
  },
  cancelRoomsFilter (state) {
    state.filters.roomsFilter.active = false
  },
  toggleRoomsFilter (state) {
    state.filters.roomsFilter.active = !state.filters.roomsFilter.active
  },
  enablePoliciesFilter (state) {
    state.filters.policiesFilter.active = true
  },
  cancelPoliciesFilter (state) {
    state.filters.policiesFilter.active = false
  },
  togglePoliciesFilter (state) {
    state.filters.policiesFilter.active = !state.filters.policiesFilter.active
  },
  filterRentals (state) {
    state.filteredRentals = state.rentals.filter((r) => {
      let isGood = true
      if (state.filters.priceFilter.active) {
        const minPrice = state.filters.priceFilter.priceRange[0]
        let maxPrice = state.filters.priceFilter.priceRange[1]
        if (maxPrice === 3500) { maxPrice = Infinity }
        const rent = r.attributes.rent
        isGood = rent >= minPrice && rent <= maxPrice
      }
      if (state.filters.roomsFilter.active) {
        const bedrooms = state.filters.roomsFilter.bedrooms
        const bathrooms = state.filters.roomsFilter.bathrooms
        if (r.attributes.bedrooms < bedrooms) {
          isGood = false
        }
        if ((r.attributes['full-bathrooms'] + r.attributes['half-bathrooms']) < bathrooms) {
          isGood = false
        }
      }
      if (state.filters.policiesFilter.active) {
        const dishWasher = state.filters.policiesFilter.dishWasher
        const garbage = state.filters.policiesFilter.garbage
        const gas = state.filters.policiesFilter.gas
        if (dishWasher && !r.attributes['dish-washer']) {
          isGood = false
        }
        if (garbage && !r.attributes.garbage) {
          isGood = false
        }
        if (gas && !r.attributes.gas) {
          isGood = false
        }
      }
      return isGood
    })
  }
}

export const actions = {
  fetchRentals: async ({ commit }) => {
    try {
      const { data } = await RentalService.getRentals()
      commit('SET_RENTALS', data)
      return data
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const getters = {
  averagePrice: (state) => {
    const avg = state.rentals.reduce((a, { attributes }) => a + attributes.rent, 0) / state.rentals.length
    return avg.toFixed(0)
  },
  filters: state => state.filters,
  rentals: state => state.rentals,
  filteredRentals: state => state.filteredRentals,
  selectedRental: state => state.selectedRental
}
