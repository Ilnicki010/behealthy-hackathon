<template>
  <div class="fullWrapper" @scroll="onScroll">
    <header class="header" v-if="this.restaurant.img" :style="this.style" id="header">
      <h1 v-if="restaurant">{{this.restaurant.name}}</h1>
      <p>{{this.restaurant.adress}} | {{this.restaurant.city}}</p>
      <a
        class="menu"
        v-if="this.restaurant.menu_link"
        :href="this.restaurant.menu_link"
        target="blank"
      >Menu</a>
    </header>
    <div class="content">
      <h2 class="basic-header">Basic Info</h2>
      <div class="info">
        <label>without GMO</label>
        <v-icon v-if="restaurant.gmo == 1" name="check" color="#007947"/>
        <v-icon v-if="restaurant.gmo == null" name="times" color="#ff6252"/>
        <label>ECO friendly</label>
        <v-icon v-if="restaurant.ecoFriendly == 1" name="check" color="#007947"/>
        <v-icon v-if="restaurant.ecoFriendly == null" name="times" color="#ff6252"/>
        <label>Veggie</label>
        <v-icon v-if="restaurant.veggie == 1" name="check" color="#007947"/>
        <v-icon
          v-if="restaurant.veggie == null || restaurant.veggie == 0"
          name="times"
          color="#ff6252"
        />
        <label>Gluten free</label>
        <v-icon v-if="restaurant.glutenFree == 1" name="check" color="#007947"/>
        <v-icon v-if="restaurant.glutenFree == null" name="times" color="#ff6252"/>
        <label>Local products</label>
        <v-icon v-if="restaurant.localProducts == 1" name="check" color="#007947"/>
        <v-icon v-if="restaurant.localProducts == null" name="times" color="#ff6252"/>
      </div>
      <h2 class="basic-header">Providers</h2>
      <div class="info info--less-padding">
        <h2 v-html="restaurant.providers"></h2>
      </div>
      <h2 class="basic-header">Certificates</h2>
      <div class="info info--less-padding">
        <a href="/about" class="link">?</a>
        <h2 v-html="restaurant.certs_name"></h2>
        <img
          v-if="restaurant.certs_imgs"
          :src="`http://localhost:1337/${restaurant.certs_imgs.url}`"
        >
      </div>
      <h2 v-if="restaurant.from_owner" class="basic-header">From owner</h2>
      <div v-if="restaurant.from_owner" class="info">
        <p v-html="restaurant.from_owner"></p>
      </div>
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
        return `background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(82, 255, 184,0.5)),url('http://localhost:1337${
          this.restaurant.img.url
        }')`;
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
  flex-direction: column;
  display: flex;
  top: 0;
  left: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: fixed;
  z-index: -99999;

  h1 {
    margin: 0;
    font-size: 3rem;
  }
}
.basic-header {
  font-size: 2.3rem;
  text-shadow: -10px -17px 0 rgba(0, 0, 0, 0.1);
  color: #52ffb8;
  margin-bottom: 5px;
  margin-top: 40px;
}
.menu {
  background: #52ffb8;
  padding: 4px;
  width: 40%;
  border-radius: 60px;
}
.info {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 100px, 100px, 100px, 100px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-items: center;
  align-items: center;
  background: #52ffb8;
  padding: 20px;
  border-radius: 4px;
  position: relative;
  img {
    max-height: 50px;
  }
  .link {
    position: absolute;
    top: -8px;
    height: 20px;
    width: 20px;
    right: -8px;
    border-radius: 100%;
    background: #1d573f;
    text-align: center;
    color: #fff;
    font-size: 0.8em;
    box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
      cursor: pointer;
    }
  }
}
.info--less-padding {
  padding: 5px;
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
