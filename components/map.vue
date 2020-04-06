<template>
  <div id="app">
    <mapbox
      :access-token="accessToken"
      :map-options="mapOptions"
      @map-load="initMap"
    />
    <v-card
      class="mx-auto rental-cards"
      width="450"
      raised
    >
      <v-toolbar color="purple darken-2" dark dense>
        <v-icon>mdi-magnify</v-icon>
        <v-text-field
          hide-details
          single-line
          class="ml-4"
        />
      </v-toolbar>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-btn small color="white mr-1">
              Price
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn small color="white mr-1">
              Room/Bath
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn small color="white mr-1">
              Policies
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-list>
            <v-subheader>
              Showing {{ filteredRentals.length }} properties
            </v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item) in filteredRentals"
                :key="item.attributes.id"
              >
                <v-list-item-content>
                  <v-lazy
                    :options="{
                      threshold: .5
                    }"
                    transition="fade-transition"
                  >
                    <RentalCard :item="item" />
                  </v-lazy>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-divider />
        </v-row>
      </v-container>
    </v-card>
    <v-row>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <v-btn color="purple darken-2" dark @click="togglePriceRangeFilter">
              Price
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-expand-transition>
              <PriceFilter v-if="filters.priceFilter.active" />
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <v-btn color="purple darken-2" dark @click="toggleRoomsFilter">
              Room/Bath
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-expand-transition>
              <RoomsFilter v-if="filters.roomsFilter.active" />
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <v-btn color="purple darken-2" dark @click="togglePoliciesFilter">
              Policies
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-0">
            <v-expand-transition>
              <PoliciesFilter v-if="filters.policiesFilter.active" />
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapMutations, mapGetters } from 'vuex'
import Mapbox from 'mapbox-gl-vue'
import RentalCard from './RentalCard'
import PriceFilter from './PriceFilter'
import RoomsFilter from './RoomsFilter'
import PoliciesFilter from './PoliciesFilter'

export default {
  components: {
    Mapbox,
    RentalCard,
    PriceFilter,
    RoomsFilter,
    PoliciesFilter
  },
  props: {
    rentals: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      accessToken: process.env.mapboxAccessToken,
      env: process.env,
      mapOptions: {
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-79.99, 40.44],
        zoom: 14
      },
      markers: [],
      activeMarkers: [],
      lastSelectedMarker: null
    }
  },
  computed: {
    ...mapGetters({
      filters: 'rentals/filters',
      filteredRentals: 'rentals/filteredRentals',
      selectedRental: 'rentals/selectedRental'
    })
  },
  watch: {
    selectedRental (newRental) {
      if (this.lastSelectedMarker) {
        this.lastSelectedMarker.classList.remove('Map__marker-active')
      }
      const markerDiv = document.getElementsByClassName(`marker${newRental.id}`)[0]
      markerDiv.classList.add('Map__marker-active')
      this.lastSelectedMarker = markerDiv
      this.map.flyTo({ center: [newRental.attributes.longitude, newRental.attributes.latitude] })
    },
    filteredRentals (newRentals) {
      this.removeMarkers()
      this.createMarkers(newRentals)
      this.addMarkers()
    }
  },
  created () {
    this.createMarkers(this.rentals)
  },
  methods: {
    ...mapMutations({
      filterRentals: 'rentals/filterRentals',
      togglePriceRangeFilter: 'rentals/togglePriceRangeFilter',
      toggleRoomsFilter: 'rentals/toggleRoomsFilter',
      togglePoliciesFilter: 'rentals/togglePoliciesFilter'
    }),
    initMap (map) {
      map._isVue = true
      this.map = map
      this.addMarkers()
    },
    createMarkers (rentals) {
      this.markers = []
      rentals.forEach((rental) => {
        this.markers.push(this.createMarker(rental))
      })
    },
    createMarker (rental) {
      return {
        id: rental.id,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [rental.attributes.longitude, rental.attributes.latitude]
        },
        properties: {
          title: '$' + rental.attributes.rent
        }
      }
    },
    addMarkers () {
      const geojson = {
        type: 'FeatureCollection',
        features: this.markers
      }

      geojson.features.forEach((marker) => {
        this.addMarker(marker)
      })
    },
    addMarker (marker) {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl')
      // create a HTML element for each feature
      const el = document.createElement('div')
      el.textContent = marker.properties.title
      el.className = 'Map__marker marker' + marker.id

      // make a marker for each feature and add to the map
      const m = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map)
      this.activeMarkers.push(m)
    },
    removeMarkers () {
      this.activeMarkers.forEach(marker => marker.remove())
      this.activeMarkers = []
    }
  }
}
</script>

<style lang="scss">
  #app {
    position: relative;
  }

  #map {
    width: 100%;
    height: 600px;
    border-radius: 0 0 4px 4px;
  }

  .rental-cards {
    position: absolute;
    top: 20px;
    left: 20px;
    max-height: 560px;
    overflow-y: scroll;
    z-index: 2;
  }

  .rental-cards::-webkit-scrollbar {
    display: none;
  }

  .rental-cards {
    -ms-overflow-style: none;
  }

  .Map__marker {
    color: white;
    background-color: #5e4da9;
    font-weight: bolder;
    letter-spacing: 1px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
  }

  .Map__marker:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-top: 6px solid #5e4da9;
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
    top: 100%;
    left: calc(50% - 6px);
  }

  .Map__marker-active, .Map__marker:hover {
    color: greenyellow;
    font-size: x-large;
    z-index: 2;
  }
</style>
