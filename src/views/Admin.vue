<script setup>
import { ref, reactive } from 'vue';
import Navbar from '../components/Navbar.vue'
import ProductDto from '../models/ProductDto';
import {postProduct, getAllProducts, deleteProduct} from '../services/ProductService'

const info = reactive({
    productName: '',
    productPrice: 0,
    productStock: 0
})

const products = ref([]);

getAllProducts()
.then(response => {
    const data = response.data.sort((a,b)=> a.productId - b.productId)
    products.value.push(...data) 
})

function onPostProduct(e){
    e.preventDefault()
    postProduct(new ProductDto(info.productName, info.productPrice, info.productStock))
    .then(product=> {
        products.value.push(product)
        info.productName = ''
        info.productPrice = 0
        info.productStock = 0
    })
}

function onDeleteProduct(id){
    deleteProduct(id)
    .then(_=> {
        products.value = products.value.filter(p=> p.productId != id)
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
                                <button class="btn btn-danger" @click="onDeleteProduct(product.productId)">X</button>
                            </div>
                        </div>
                    </li>
                </ul>
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