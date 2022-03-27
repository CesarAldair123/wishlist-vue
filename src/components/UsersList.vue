<script setup>
import { RouterLink } from 'vue-router';
import { usersStore } from '@/stores/users.js'

const store = usersStore();

function onDeleteUser(id){
    store.deleteUser(id)
}
</script>
<template>
    <h2>Users</h2>
    <ul class="list-group">
        <li class="list-group-item" v-for="user in store.users" v-bind:key="user.id">
            <div class="row">
                <div class="col-7">{{user.userId}} - {{user.userName}}</div>
                <div class="col-5">
                    <div class="row">
                        <div class="col-6"><RouterLink :to="{name: 'adminEditUser', params:{id: user.userId}}" class="btn btn-secondary">E</RouterLink></div>
                        <div class="col-6"><button class="btn btn-danger" @click="onDeleteUser(user.userId)">X</button></div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>