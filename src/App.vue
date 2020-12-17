<template>
  <div id="app">
    <dm-loader :page-name="`#1DQ-发变组`"></dm-loader>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
<script>
  import DmLoader from "./views/DmLoader";
  import ProgressBar from "./components/progress-bar/ProgressBar";
  export default {
    components: {ProgressBar, DmLoader}
  }
</script>
