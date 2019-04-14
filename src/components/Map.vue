<template>
  <div class="mapWrapper">
    <MglMap
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :center="[18.53, 54.4]"
      :zoom="7"
      @load="mapInitialized"
    />
  </div>
</template>
<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import axios from "axios";
export default {
  components: {
    MglMap
  },
  props: ["city"],
  data() {
    return {
      map: {},
      restaurants: [],
      accessToken:
        "pk.eyJ1IjoiaWxuaWNraSIsImEiOiJjanVmaXVrejkwZGhyNDRwcXc3d25wZDc1In0.kkwIEP6gDUwSwt964veDfg", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/dark-v10" // your map style
    };
  },
  watch: {
    city: function(newVal, oldVal) {
      // watch it
      this.fetchAllRestaurants(newVal);
      this.flyTo(newVal);
    }
  },
  methods: {
    fetchAllRestaurants(city) {
      if (city) {
        axios
          .get(`http://localhost:1337/restaurants?city=${city}`)
          .then(response => {
            this.restaurants = response.data;
            this.addMarks();
          });
      } else {
        axios.get(`http://localhost:1337/restaurants`).then(response => {
          this.restaurants = response.data;
          this.addMarks();
        });
      }
    },
    addMarks() {
      this.restaurants.map(restaurant => {
        console.log("1");
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundColor = "#52ffb8";
        el.style.width = "20px";
        el.style.height = "20px";
        el.style.borderRadius = "100%";
        el.dataset.id = restaurant.id;
        this.marker = new Mapbox.Marker(el)
          .setLngLat({ lng: restaurant.long, lat: restaurant.lat })
          .addTo(this.map);

        el.addEventListener("click", e => {
          console.log(el.dataset.id);
          this.$emit("clickMarker", el.dataset.id);
        });
      });
    },
    mapInitialized(map) {
      console.log("map.map");
      this.map = map.map;
      this.fetchAllRestaurants();
    },
    flyTo(city) {
      if (city == "Gdynia") {
        this.map.flyTo({
          center: [18.54, 54.515],
          zoom: "11"
        });
      } else if (city == "Gdansk") {
        this.map.flyTo({
          center: [18.646, 54.35352],
          zoom: "11"
        });
      } else if (city == "Sopot") {
        this.map.flyTo({
          center: [18.56, 54.441],
          zoom: "11"
        });
      }
    }
  },
  mounted() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>
<style lang="scss" scoped>
.mapWrapper {
  text-align: left;
  position: absolute;
  width: 100vw;
  height: 100%;
  left: 0;
}
#map {
  width: 100%;
}
</style>
