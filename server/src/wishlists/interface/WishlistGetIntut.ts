interface currentProductType {
  id?: number;
  productID: number;
}

export interface WishlistInputDTO {
  currentProduct: currentProductType;
  userToken: string;
}

export interface WihslistsDataGTO {
  id: number;
  productID: number;
}

export default class WishlistsGTO {
  id;
  productID;
  constructor({ id, productID }: WihslistsDataGTO) {
    this.id = id;
    this.productID = productID;
  }
}
