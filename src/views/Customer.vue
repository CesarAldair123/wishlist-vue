<script setup>
import Navbar from '../components/Navbar.vue'
import { userId, getJwt } from '../services/AuthService';

console.log(userId(getJwt()))
</script>
<template>
    <Navbar></Navbar>
    <h1>Customer Page</h1>    
</template>
<style>
</style>