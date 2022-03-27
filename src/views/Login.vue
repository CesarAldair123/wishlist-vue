<script setup>
import { reactive } from 'vue';
import { login } from '../services/AuthService'
import LoginRequest from '../models/LoginRequest';

const info = reactive({
    nickname: '',
    password: ''
})

function onLogin(e){
    e.preventDefault()
    login(new LoginRequest(info.nickname, info.password))
}

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <h1>Login</h1>
                <form>
                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname: </label>
                    <input type="text" class="form-control" id="nickname" aria-describedby="nickname-field" v-model="info.nickname">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="info.password">
                </div>
                <button type="submit" class="btn btn-primary" @click="onLogin">Submit</button>
                </form>
                <RouterLink to="/signup">I don't have an account</RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
</style>