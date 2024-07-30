export type ProductTypes = {
  id: number;
  title: string;
  description: string;
  discount: number;
  price: number;
  mainPrice: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  category_id: number;
  subcategory_id: number;
};

export type AllPrice = {
  price: number;
  discount: number;
  mainPrice: number;
};
