import axios from "axios";

const RESOURCE_API = "http://localhost:8080"

// export function postProduct(productDto){
//     return axios.post(RESOURCE_API + "/products", productDto)
//     .then(response => {
//         console.log("Product Added!")
//         alert("Product Added!")
//         return response.data
//     })
// }

export function getUser(id){
    return axios.get(RESOURCE_API + "/user/" + id)
}

export function getAllUsers(){
    return axios.get(RESOURCE_API + "/user")
}

export function deleteUser(id){
    return axios.delete(RESOURCE_API + "/user/" + id)
}

export function patchUser(id, info){
    return axios.patch(RESOURCE_API + "/user/" + id, info, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

// export function patchProductPrice(id, price){
//     return axios.patch(RESOURCE_API + "/products/productPrice/" + id, price, {
//         headers:{
//             'Content-Type':'text/plain'
//         }
//     })
// }

// export function patchProductStock(id, stock){
//     return axios.patch(RESOURCE_API + "/products/productStock/" + id, stock, {
//         headers:{
//             'Content-Type':'text/plain'
//         }
//     })
// }