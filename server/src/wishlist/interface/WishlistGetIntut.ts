interface currentProductType {
  id?: number;
  productID: number;
}

export interface WishlistInputDTO {
  currentProduct: currentProductType;
  userToken: string;
}

export interface WihslistDataGTO {
  id: number;
  productID: number;
}

export default class WishlistGTO {
  id;
  productID;
  constructor({ id, productID }: WihslistDataGTO) {
    this.id = id;
    this.productID = productID;
  }
}
