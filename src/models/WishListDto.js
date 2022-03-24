export default class WishListDto{
    constructor(userId,productId){
        this.userId = userId
        this.productsIds = [
            productId
        ] 
    }
}