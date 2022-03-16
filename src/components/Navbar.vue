<script setup>
import {logout} from "../services/AuthService"

function onLogout(){
    logout()
}
</script>

<template>
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand m-2" href="#">Wishlist</a>
        <button class="btn btn-primary m-2" @click="onLogout">Logout</button>
    </nav>
</template>

<style>
</style>