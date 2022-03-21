<script setup>
import { ref, reactive } from 'vue';
import Navbar from '../components/Navbar.vue'
import ProductsList from '../components/ProductsList.vue';
import { RouterLink } from 'vue-router';
import ProductDto from '../models/ProductDto';
import {patchProductName, getProduct, patchProductStock, patchProductPrice} from '../services/ProductService'
import {useRoute} from 'vue-router'
import { productsStore } from '../stores/products';

const store = productsStore()
const router = useRoute()
const id = router.params.id;

const info = reactive({
    name: '',
    price: '',
    stock: '',
    addStock: 0
})

function onUpdateName(e){
    e.preventDefault()
    patchProductName(id, info.name)
    .then(()=>store.editProd({
        productId: id,
        productName: info.name,
        productPrice: info.price,
        productStock: info.stock,
    }))
}

function onUpdatePrice(e){
    e.preventDefault()
    patchProductPrice(id, info.price)
}

function onUpdateStock(e){
    e.preventDefault()
    patchProductStock(id, info.addStock)
    .then(_=>{
        info.stock = info.stock + info.addStock,
        info.addStock = 0
    })
}

getProduct(id)
.then((res)=>{
    const product = res.data
    info.name = product.productName
    info.price = product.productPrice
    info.stock = product.productStock
});

</script>

<template>
    <Navbar></Navbar>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <ProductsList></ProductsList>
            </div>
            <div class="col-md-8">
                <h2>Edit Product</h2>  
                <form>
                    <div class="mb-3">
                        <label for="productName" class="form-label">Product Name: </label>
                        <input type="text" class="form-control" id="productName" v-model="info.name">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Update Name" @click="onUpdateName">
                </form>
                <hr>
                <form>
                    <div class="mb-3">
                        <label for="productPrice" class="form-label">Product Price: </label>
                        <input type="number" class="form-control" id="productPrice" v-model="info.price">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Update Price" @click="onUpdatePrice">
                </form>
                <hr>
                <form>
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
                    <input type="submit" class="btn btn-primary" value="Updated Stock" @click="onUpdateStock">
                </form>
            </div>
        </div>    
    </div>  
</template>

<style>
</style>