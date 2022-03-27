import { ref } from 'vue';
import { defineStore } from 'pinia'
import { getAllProducts, deleteProduct, postProduct, getProduct } from '../services/ProductService'

export const productsStore = defineStore("products", ()=>{
  const products = ref([]);

  getAllProducts()
  .then(response =>{
    const data = response.data.sort((a,b) => a.productId - b.productId)
    products.value.push(...data) 
  });

  function editProd(product){
    const productToEdit = products.value.filter(p=>p.productId == product.productId)[0]
    productToEdit.productName = product.productName
    productToEdit.productPrice = product.productPrice
    productToEdit.productStock = product.productStock
  }

  function deleteProd(id){
    return deleteProduct(id)
    .then(_=> {
        products.value = products.value.filter(p=> p.productId != id)
    })
  }

  function addProd(productDto){
    return postProduct(productDto)
    .then(product=> {
      products.value.push(product)
    })
  }

  return {products, editProd, deleteProd, addProd}
})
