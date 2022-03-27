<script setup>
import { ref } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import { RouterLink } from 'vue-router';
import {getJwt, getRole, logout} from "../services/AuthService"

const role = ref(getRole(getJwt()))

function onLogout(){
    logout()
}

</script>

<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand m-2" href="#">Wishlist</a>
          <div class="collapse navbar-collapse" id="navbarNav">
                <ul v-if = "role === 'admin'" class="navbar-nav">
                    <li class="nav-item active">
                        <router-link :to="{name: 'adminAddProd'}" class="nav-link">Products</router-link>
                        <!-- <a class="nav-link" href="#">Product</a> -->
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'adminEditUser'}" class="nav-link">Users</router-link>
                        <!-- <a class="nav-link" href="#">Users</a> -->
                    </li>
                </ul>
            </div>
        <button class="btn btn-primary m-2" @click="onLogout">Logout</button>
    </nav>
</template>

<style>
</style>