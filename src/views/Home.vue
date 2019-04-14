<template>
  <div class="home">
    <header class="header">
      <Map :city="selected" @clickMarker="clickMarker"/>
    </header>
    <div class="content">
      <select class="select" v-model="selected" @change="changeCity">
        <option value="All">Wybierz miasto...</option>
        <option value="Gdynia">Gdynia</option>
        <option value="Gdansk">Gdansk</option>
        <option value="Sopot">Sopot</option>
      </select>
      <div class="results">
        <h2 class="cityName">{{selected}}</h2>
        <div v-for="restaurant in restaurants">
          <Element :restaurant="restaurant"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Element from "@/components/Element.vue";
import Map from "@/components/Map.vue";
import axios from "axios";
export default {
  name: "home",
  components: {
    Element,
    Map
  },
  data() {
    return {
      restaurants: [],
      selected: "All"
    };
  },
  methods: {
    clickMarker(id) {
      console.log(id);
      if (id) {
        axios
          .get(`http://localhost:1337/restaurants?id=${id}`)
          .then(results => {
            this.restaurants = results.data;
            console.log(results.data);
          });
      }
    },

    changeCity() {
      console.log(this.selected);
      if (this.selected == "All") {
        axios.get(`http://localhost:1337/restaurants`).then(results => {
          this.restaurants = results.data;
          console.log(results.data);
        });
      } else {
        //this.$emit("changeCity", this.selected);
        axios
          .get(`http://localhost:1337/restaurants?city=${this.selected}`)
          .then(results => {
            this.restaurants = results.data;
            console.log(results.data);
          });
      }
    }
  },
  mounted() {
    axios.get("http://localhost:1337/restaurants").then(results => {
      this.restaurants = results.data;
      console.log(results);
    });
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 180px;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  left: auto;
  z-index: -9999;
  text-align: center;
  text-shadow: 1px 2px 2px rgba(82, 255, 184, 0.3);
  justify-content: center;
  align-items: center;
}
.cityName {
  position: absolute;
  z-index: -99;
  top: -95px;
  font-size: 4rem;
}
.content {
  padding: 20px;
  margin-top: 170px;
  z-index: 9999;
  background: #fefefe;
  box-shadow: 0 -6px 15px rgba(82, 255, 184, 0.3);
}
.results {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 9999999;
  margin-top: 50px;
  @media (min-width: 1025px) {
    flex-wrap: wrap;
    flex-direction: row;
  }
}

.select {
  background: #52ffb8;
  border: 0;
  padding: 10px;
  width: 100%;
  border-radius: 60px;
  color: #444;
  &:focus {
    outline: none;
    background: #06ae688e;
  }
  @media (min-width: 1025px) {
    height: 50px;
  }
}
</style>

