<script setup>
import {reactive} from 'vue'
import {signup} from '../services/AuthService'
import SignupRequest from '../models/SignupRequest';

const info = reactive({
    names: '',
    surname: '',
    email: '',
    phone: '',
    nickname: '',
    password: ''
})

function onSignup(e){
    e.preventDefault()
    signup(new SignupRequest(info.names, info.surname, info.phone, info.email, info.nickname, info.password))
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <h1>Signup</h1>
                <form>
                <div class="mb-3">
                    <label for="names" class="form-label">Names: </label>
                    <input type="text" class="form-control" id="names" v-model="info.names">
                </div>
                <div class="mb-3">
                    <label for="surname" class="form-label">Surname</label>
                    <input type="text" class="form-control" id="surname" v-model="info.surname">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone: </label>
                    <input type="text" class="form-control" id="phone" v-model="info.phone">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email: </label>
                    <input type="email" class="form-control" id="email" v-model="info.email">
                </div>
                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname: </label>
                    <input type="text" class="form-control" id="nickname" v-model="info.nickname">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password: </label>
                    <input type="password" class="form-control" id="password" v-model="info.password">
                </div>
                <input type="submit" class="btn btn-primary" value="Signup" @click="onSignup">
                </form>
                <RouterLink to="/login">I already have an account</RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
</style>