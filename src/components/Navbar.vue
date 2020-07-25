<template>
    <nav class="main-navbar">
        <router-link class="main-navbar__link" to="/">Записаться</router-link>
        <router-link class="main-navbar__link" to="/patients">Список пациентов</router-link>
    </nav>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .main-navbar {
        background: white;
        display: flex;
        justify-content: center;
    }
    .main-navbar__link {
        text-decoration: none;
        color: black;
        padding: 10px 10px;
    }
    .main-navbar__link:hover, .router-link-exact-active {
        background: #f7f9fa;
    }

</style>