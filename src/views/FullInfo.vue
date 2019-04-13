<template>
  <div class="fullWrapper" @scroll="onScroll">
    <header class="header" v-if="this.restaurant.img" :style="this.style" id="header">
      <h1 v-if="restaurant">{{this.restaurant.name}}</h1>
    </header>
    <div class="content">
      <h2 class="basic-header">Basic Info</h2>
      <div class="basicInfo">
        <label>without GMO</label>
        <v-icon v-if="restaurant.gmo == 1" name="check"/>
        <v-icon v-if="restaurant.gmo == null" name="times"/>
        <label>ECO friendly</label>
        <v-icon v-if="restaurant.ecoFriendly == 1" name="check"/>
        <v-icon v-if="restaurant.ecoFriendly == null" name="times" color="#ff6252"/>
        <label>Veggie</label>
        <v-icon v-if="restaurant.veggie == 1" name="check"/>
        <v-icon v-if="restaurant.veggie == null" name="times"/>
        <label>Gluten free</label>
        <v-icon v-if="restaurant.glutenFree == 1" name="check"/>
        <v-icon v-if="restaurant.glutenFree == null" name="times"/>
      </div>
      <p>
        The specification details that the default behavior in align-self is to stretch, except for items which have an intrinsic aspect ratio, in this case they behave as start. The reason for this, is that if items with an aspect ratio are set to stretch, this default would distort them.
        The specification details that the default behavior in align-self is to stretch, except for items which have an intrinsic aspect ratio, in this case they behave as start. The reason for this, is that if items with an aspect ratio are set to stretch, this default would distort them.
        The specification details that the default behavior in align-self is to stretch, except for items which have an intrinsic aspect ratio, in this case they behave as start. The reason for this, is that if items with an aspect ratio are set to stretch, this default would distort them.
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
let i = 0;
let last = 0;
export default {
  data() {
    return {
      restaurant: null
    };
  },
  props: ["id"],
  methods: {
    onScroll(e) {
      document.querySelector("#header").style.filter = `blur(${window.scrollY /
        10}px)`;

      last = window.scrollY;
    },
    getRestaurant() {
      axios
        .get(`http://localhost:1337/restaurants/?id=${this.id}`)
        .then(response => {
          console.log(response);
          this.restaurant = response.data[0];
        });
    }
  },
  computed: {
    style() {
      if (this.restaurant.img) {
        return `background-image:url("http://localhost:1337${
          this.restaurant.img.url
        }")`;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    console.log(this.id);
    this.getRestaurant();
    console.log(this.restaurant);
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 180px;
  width: 100%;
  color: #fff;
  position: fixed;
  display: flex;
  top: 0;
  left: auto;
  z-index: -9999;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: fixed;
  z-index: -99999;
}
.basic-header {
  font-size: 2.3rem;
  text-shadow: -10px -17px 0 rgba(0, 0, 0, 0.3);
  color: #52ffb8;
}
.basicInfo {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 100px, 100px, 100px, 100px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-items: center;
  align-items: center;
  background: #52ffb8;
  padding: 20px;
}
.content {
  z-index: 99999;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: 170px;
  z-index: 9999;
  background: #fefefe;
  box-shadow: 0 -6px 15px rgba(82, 255, 184, 0.3);
}
</style>
