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

export function getAllProducts(){
    return axios.get(RESOURCE_API + "/products")
}

export function deleteProduct(id){
    return axios.delete(RESOURCE_API + "/products/" + id)
}