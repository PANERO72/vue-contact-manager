<template>
	<nav-bar-component></nav-bar-component>
	<router-view></router-view>
</template>

<script>
import NavBarComponent from './components/NavBarComponent.vue'
export default {
  components: { NavBarComponent },
	name: 'App'
}
</script>

<style>
/* #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
} */

</style>