<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  export default {
    components: {
      Navbar
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body {
    background: #f7f9fa;
  }



</style>
