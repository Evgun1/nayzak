interface CartProductData {
  id: number;
  productID: number;
  amount: number;
}

export interface CartGetDTO {
  product: CartProductData;
  userToken: string;
}
