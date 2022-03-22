import axios from "axios";

const RESOURCE_API = "http://localhost:8080"

export function postWishList(wishlistDto){
    return axios.post(RESOURCE_API + "/wishlist", wishlistDto)
    .then(response => {
        console.log("Wishlist Added!")
        alert("Wishlist Added!")
        return response.data
    })
}

export function getWishListByUserId(userId){
    return axios.get(RESOURCE_API + "/wishlist/" + userId)
}

export function deleteWishList(userId, productId){
    return axios.delete(RESOURCE_API + "/wishlist/" + userId + "/" + productId)
}