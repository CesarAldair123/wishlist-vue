<script setup>
import { ref, reactive } from 'vue';
import Navbar from '../components/Navbar.vue'
import WishListDto from '../models/WishListDto';
import {getUserId} from '../services/AuthService'
import {getAllProducts, getProduct} from '../services/ProductService'
import {getWishListByUserId, deleteWishList} from '../services/WishListService'

const info = reactive({
    productId: 0
})

const userId = getUserId();
const products = ref([]);
const product = ref([]);
const wishlist = ref([]);

getAllProducts()
.then(response => {
    const data = response.data.sort((a,b)=> a.productId - b.productId)
    products.value.push(...data) 
    console.log("PRODUCTO " + wishlist.productId)
})

getWishListByUserId(userId)
.then(response => {
    const data = response.data.sort((a,b)=> a.productId - b.productId)
    wishlist.value.push(...data) 
    console.log("DATA " + wishlist.productId)
})

function onPostWishList(e){
    e.preventDefault()
    postProduct(new WishListDto(userId, info.productId))
    .then(wishlist=> {
        wishlist.value.push(wishlist)
        userId
        info.productId = 0
    })
}

function onDeleteWishList(userId, productId){
    deleteWishList(userId, productId)
    .then(_=> {
        wishlist.value = wishlist.value.filter(p=> p.productId != productId)
    })
}

</script>

<template>
    <Navbar></Navbar> 

    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <h2>Products</h2>
                <ul class="list-group">
                    <li class="list-group-item" v-for="product in products" v-bind:key="product.id">
                        <div class="row">
                            <div class="col-9">{{product.productId}} - {{product.productName}}</div>
                            <div class="col-3">
                                <button class="btn btn-success" @click="getUserId()">+</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-md-8">
                <h2>Whislist</h2>
                <ul class="list-group">
                    <li class="list-group-item" v-for="wishlist in wishlist" v-bind:key="wishlist.id">
                        <div class="row">
                            <div class="col-9">{{wishlist}} - NOMBRE DEL PRODUCTO </div>
                            <div class="col-3">
                                <button class="btn btn-danger" @click="onDeleteWishList(userId, wishlist)">x</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>    
    </div> 

</template>

<style>
</style>