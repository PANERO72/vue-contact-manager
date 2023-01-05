<template>
    <div class="container-fluid p-0">
        <nav class="navbar navbar-dark bg-success navbar-expand-sm py-3">
            <span class="navbar-brand"><i class=" fa fa-mobile-alt"></i>&nbsp; Administrador de Contactos en Vue</span>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
nav {
	padding-top: 30px;
    padding-right: 80px;
    padding-bottom: 30px;
    padding-left: 80px;
}

nav a {
	font-weight: bold;
	color: #000000;
    text-decoration: none;
    margin-right: 15px;
    margin-left: 15px;
}

nav a:hover {
    text-decoration: underline;
}

nav a.router-link-exact-active {
	color: #ffffff;
    pointer-events: none;
    text-decoration: underline;
}

</style>