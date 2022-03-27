<script setup>
import { reactive } from 'vue';
import Navbar from '../components/Navbar.vue'
import ProductsList from '../components/ProductsList.vue';
import ProductDto from '../models/ProductDto';
import { RouterLink } from 'vue-router';
import { productsStore } from '../stores/products';
import { userId, getJwt } from '../services/AuthService';

const store = productsStore()

const info = reactive({
    productName: '',
    productPrice: 0,
    productStock: 0
})

function onPostProduct(e){
    e.preventDefault()
    store.addProd(new ProductDto(info.productName, info.productPrice, info.productStock))
    .then(_=> {
        info.productName = ''
        info.productPrice = 0
        info.productStock = 0
    })
}

</script>

<template>
    <Navbar></Navbar>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <ProductsList></ProductsList>
            </div>
            <div class="col-md-8">
                <h2>Add Product</h2>  
                <form>
                <div class="mb-3">
                    <label for="productName" class="form-label">Product Name: </label>
                    <input type="text" class="form-control" id="productName" v-model="info.productName">
                </div>
                <div class="mb-3">
                    <label for="productPrice" class="form-label">Product Price: </label>
                    <input type="number" class="form-control" id="productPrice" v-model="info.productPrice">
                </div>
                <div class="mb-3">
                    <label for="productStock" class="form-label">Product Stock: </label>
                    <input type="number" class="form-control" id="productStock" v-model="info.productStock">
                </div>
                <input type="submit" class="btn btn-primary" value="Add Product" @click="onPostProduct">
                </form>
            </div>
        </div>    
    </div>  
</template>

<style>
</style>