<script setup>
import { ref, reactive } from 'vue';
import Navbar from '../components/Navbar.vue'
import { RouterLink } from 'vue-router';
import {getUser, getAllUsers, deleteUser, patchUser} from '../services/UserService'
import {useRoute} from 'vue-router'
import { usersStore } from '@/stores/users.js'

const store = usersStore()
const router = useRoute()

const info = reactive({
    userId: '',
    userName: '',
    userSurname: '',
    userNickname: '',
    userEmail: '',
    userPassword: '',
    userPhoneNumber: '',
    userRole: ''
})

function onClearFields(){
    info.userId = ''
    info.userName = '',
    info.userSurname = '',
    info.userNickname = '',
    info.userEmail = '',
    info.userPassword = '',
    info.userPhoneNumber = '',
    info.userRole = ''
}

function onUpdateUser(){
    if(info.userName.length > 0){
        if(info.userPassword.length > 0){
            patchUser(info.userId, info)
            .then((res) => {
                const user = res.data
                store.editUser({
                    userId: user.userId,
                    userName: user.userName,
                    userSurname: user.userSurname,
                    userNickname: user.userNickname,
                    userEmail: user.userEmail,
                    userPassword: user.userPassword,
                    userPhoneNumber: user.userPhoneNumber,
                    userRole: user.userRole
                })
            })
            alert("User was updated")
            onClearFields();
        }else
        alert("Password most not be empty")
    }else{
        alert("Select one user")
    }
    
}

function onEditUser(id){
    getUser(id).then((res) => {
        const user = res.data
        info.userId = user.userId
        info.userName = user.userName
        info.userSurname = user.userSurname
        info.userNickname = user.userNickname
        info.userEmail = user.userEmail
        info.userPhoneNumber = user.userPhoneNumber
        info.userRole = user.userRole
    })
}

function onDeleteUser(id){
    store.deleteUsr(id)
}

</script>

<template>
    <Navbar></Navbar>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <h2>Users</h2>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="user in store.users" v-bind:key="user.id">
                            <div class="row">
                                <div class="col-7">{{user.userId}} - {{user.userName}} {{user.userSurname}}</div>
                                <div class="col-5">
                                    <div class="row">
                                        <div class="col-6"><button class="btn btn-secondary" @click="onEditUser(user.userId)">E</button></div>
                                        <div class="col-6"><button class="btn btn-danger" @click="onDeleteUser(user.userId)">X</button></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
            </div>
            <div class="col-md-8">
                <h2>Edit User</h2>
                <form>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-6">
                                <label for="userName" class="form-label">User Name: </label>
                                <input type="text" class="form-control" id="userName" v-model="info.userName">
                            </div>
                            <div class="col-6">
                                <label for="userSurname" class="form-label">User Surname: </label>
                                <input type="text" class="form-control" id="userSurname" v-model="info.userSurname">
                            </div>
                        </div>
                    </div>
                <form>
                    <div class="mb-3">
                        <div class="row">
                                <div class="col-12">
                                    <label for="userNickname" class="form-label">User Nickname: </label>
                                    <input type="text" class="form-control" id="userNickname" v-model="info.userNickname">
                                </div>
                            </div>
                        </div>
                </form>
                <form>
                    <div class="mb-3">
                        <div class="row">
                                <div class="col-12">
                                    <label for="userPassword" class="form-label">User Password: </label>
                                    <input type="text" class="form-control" id="userPassword" v-model="info.userPassword">
                                </div>
                            </div>
                        </div>
                </form>
                <form>
                    <div class="container">
                        <div class="row justify-content-md-center">
                                <div class="col col-lg-4">
                                    <button class="btn btn-info" type="button" @click="onClearFields">Clear</button>
                                </div>
                                <div class="col col-lg-4">
                                    <button class="btn btn-success" type="button" @click="onUpdateUser()">Update User</button>
                                </div>
                            </div>
                        </div>
                </form>



                    <!-- <div class="mb-3">
                        <label for="productPrice" class="form-label">Product Price: </label>
                        <input type="number" class="form-control" id="productPrice" v-model="info.price">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Update Price" @click="onUpdatePrice">
                    <div class="mb-3">
                        <label for="productStock" class="form-label">Add Stock: </label>
                        <div class="row">
                            <div class="col-6">
                                <input type="number" class="form-control" id="productStock" v-model="info.stock" disabled>
                                <small class="form-text text-muted">Actual Stock</small>
                            </div>
                            <div class="col-6">
                                <input type="number" class="form-control" id="productStock" v-model="info.addStock">
                                <small  class="form-text text-muted">To Add</small>
                            </div>
                        </div>
                    </div>
                    <input type="submit" class="btn btn-primary" value="Updated Stock" @click="onUpdateStock"> -->
                </form>
            </div>
        </div>
    </div>
</template>

<style>
</style>