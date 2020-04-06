<template>
  <div class="map-wrapper">
    <client-only>
      <Map :rentals="rentals" />
    </client-only>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Map from '~/components/Map'

export default {
  components: {
    Map
  },
  async fetch ({ store, error }) {
    try {
      await store.dispatch('rentals/fetchRentals')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch rentals at this time. Please try again.' + e.message
      })
    }
  },
  data () {
    return {}
  },
  computed: mapState({
    rentals: state => state.rentals.rentals
  }),
  head () {
    return {
      script: [
        { src: 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .map-wrapper {
    min-height: 800px;
  }
</style>
