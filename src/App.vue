<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

h2 {
  font-family: "Poppins", sans-serif;
}
body {
  font-family: "Source Sans Pro", sans-serif;
  color: #333;
}
body {
  margin: 0;
  padding: 0;
}
a {
  color: #333;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
