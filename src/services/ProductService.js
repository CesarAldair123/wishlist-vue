import axios from "axios";

const RESOURCE_API = "http://localhost:8080"

export function postProduct(productDto){
    return axios.post(RESOURCE_API + "/products", productDto)
    .then(response => {
        console.log("Product Added!")
        alert("Product Added!")
        return response.data
    })
}

export function getProduct(id){
    return axios.get(RESOURCE_API + "/products/" + id)
}

export function getAllProducts(){
    return axios.get(RESOURCE_API + "/products")
}

export function deleteProduct(id){
    return axios.delete(RESOURCE_API + "/products/" + id)
}

export function patchProductName(id, productName){
    return axios.patch(RESOURCE_API + "/products/" + id, productName, {
        headers:{
            'Content-Type':'text/plain'
        }
    })
}

export function patchProductPrice(id, price){
    return axios.patch(RESOURCE_API + "/products/productPrice/" + id, price, {
        headers:{
            'Content-Type':'text/plain'
        }
    })
}

export function patchProductStock(id, stock){
    return axios.patch(RESOURCE_API + "/products/productStock/" + id, stock, {
        headers:{
            'Content-Type':'text/plain'
        }
    })
}