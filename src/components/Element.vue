<template>
  <router-link :to="'/restaurant/' + this.restaurant.id">
    <div class="postWrapper">
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
  </router-link>
</template>

<script>
export default {
  name: "Element",
  props: {
    restaurant: Object
  }
};
</script>


<style scoped lang="scss">
.postWrapper {
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
</style>
