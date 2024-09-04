interface CartProductData {
  id: number;
  productID: number;
  amount: number;
}

export interface CartGetDTO {
  cartProduct: CartProductData;
  userToken: string;
}
