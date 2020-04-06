<template>
  <v-sheet transparent @click="onRentalClick(item)">
    <div class="d-flex flex-no-wrap">
      <v-avatar
        class="ma-3"
        size="100"
        tile
      >
        <v-img :src="item.attributes['cover-photo-medium']" />
      </v-avatar>
      <div class="d-flex flex-column justify-center">
        <p class="body-1 mb-0">
          {{ rentalTitle(item.attributes) }}
        </p>
        <p class="body-2 mb-0">
          {{ item.attributes['display-name'] }}
        </p>
        <p class="title text--primary mb-0">
          {{ rentalPrice(item.attributes.rent) }}
        </p>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'RentalCard',
  // eslint-disable-next-line vue/require-prop-types
  props: ['item'],
  methods: {
    ...mapMutations({
      setSelectedRental: 'rentals/setSelectedRental'
    }),
    onRentalClick (item) {
      this.setSelectedRental(item)
    },
    rentalTitle (attributes) {
      const bedrooms = attributes.bedrooms
      const fullBathroom = attributes['full-bathrooms']
      const halfBathroom = attributes['half-bathrooms']
      const bathrooms = halfBathroom ? `${fullBathroom} ${halfBathroom}/2` : fullBathroom
      const type = attributes.type
      return `${bedrooms} Bedroom, ${bathrooms} Bathroom ${type}`
    },
    rentalPrice (rent) {
      return '$' + rent.toLocaleString()
    }
  }
}
</script>

<style scoped>

</style>
