<script setup>
import { ref, reactive } from 'vue';
import Navbar from '../components/Navbar.vue'
import WishListDto from '../models/WishListDto';
import {getUserId} from '../services/AuthService'
import {getAllProducts, getProduct} from '../services/ProductService'
import {getWishListByUserId, deleteWishList, postWishList} from '../services/WishListService'

const userId = getUserId();
const products = ref([]);
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

function onPostWishList(productId){
    const product = wishlist.value.filter(p=>p.productId==productId)[0]
    if(product) return 
    postWishList(new WishListDto(userId, productId))
    .then(wish=> {
        wishlist.value.push(products.value.filter(p=>p.productId==productId)[0])
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
                                <button class="btn btn-success" @click="onPostWishList(product.productId)">+</button>
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
                            <div class="col-9">{{wishlist.productId}} - {{wishlist.productName}}</div>
                            <div class="col-3">
                                <button class="btn btn-danger" @click="onDeleteWishList(userId, wishlist.productId)">x</button>
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