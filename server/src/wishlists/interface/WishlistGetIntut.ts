interface currentProductType {
    id?: number;
    productID: number;
}

export interface WishlistInputDTO {
    currentProduct: currentProductType;
    customerID: number;
}

export interface WishlistsDataGTO {
    id: number;
    productID: number;
}

export default class WishlistsGTO {
    id;
    productID;
    constructor({ id, productID }: WishlistsDataGTO) {
        this.id = id;
        this.productID = productID;
    }
}
