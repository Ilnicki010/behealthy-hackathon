<template>
  <div class="home">
    <header class="header">
      <h1>Look inside your meal</h1>
    </header>
    <div class="content">
      <select class="select" v-model="selected" @change="changeCity">
        <option disabled value>Wybierz miasto...</option>
        <option value="Gdynia">Gdynia</option>
        <option value="Gdansk">Gdansk</option>
        <option value="Sopot">Sopot</option>
      </select>
      <div class="results">
        <h2 class="cityName">{{selected}}</h2>
        <div class="post" v-for="restaurant in restaurants">
          <div class="info">
            <h2>{{restaurant.name}}</h2>
            <p>{{restaurant.adress}} | {{restaurant.city}}</p>
          </div>
          <div class="basic-info">
            <div class="col">
              <label :class="{ 'isTrue' : restaurant.gmo == 1}">GMO</label>
            </div>
            <div class="col">
              <label :class="{ 'isTrue' : restaurant.ecoFriendly == 1}">ECO friendly</label>
            </div>
            <div class="col">
              <label :class="{ 'isTrue' : restaurant.veggie == 1}">Veggie</label>
            </div>
            <div class="col">
              <label :class="{ 'isTrue' : restaurant.glutenFree == 1}">Gluten free</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      restaurants: [],
      selected: "All"
    };
  },
  methods: {
    changeCity() {
      console.log(this.selected);
      axios
        .get(`http://localhost:1337/restaurants?city=${this.selected}`)
        .then(results => {
          this.restaurants = results.data;
          console.log(results.data);
        });
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
  z-index: 99;
  top: -100px;
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
}
.post {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #52ffb8;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(82, 255, 184, 0.3);
  margin-top: 25px;
  z-index: 9999;
}
.basic-info {
  padding: 5px 20px 20px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-items: stretch;
  align-items: stretch;
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.isTrue {
  border-bottom: 4px solid #78bc61;
}
label {
  font-size: 0.8em;
  padding: 5px;
  border-bottom: 4px solid #bc6178;
}
.select {
  background: #52ffb8;
  border: 0;
  padding: 10px;
  width: 100%;
  border-radius: 60px;
  color: #444;
}
</style>

