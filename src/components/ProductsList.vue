<script setup>
import { RouterLink } from 'vue-router';
import { productsStore } from '@/stores/products.js'

const store = productsStore()

function onDeleteProduct(id){
    store.deleteProd(id)
}
</script>

<template>
    <h2>Products <RouterLink :to="'/admin/product/add'" class="btn btn-success mb-2">+</RouterLink></h2>
    <ul class="list-group">
        <li class="list-group-item" v-for="product in store.products" v-bind:key="product.id">
            <div class="row">
                <div class="col-7">{{product.productId}} - {{product.productName}}</div>
                <div class="col-5">
                    <div class="row">
                        <div class="col-6"><RouterLink :to="{name: 'adminEditProd', params:{id: product.productId}}" class="btn btn-secondary">E</RouterLink></div>
                        <div class="col-6"><button class="btn btn-danger" @click="onDeleteProduct(product.productId)">X</button></div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>