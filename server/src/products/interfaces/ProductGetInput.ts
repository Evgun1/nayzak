export default interface ProductGetDTO {
  page?: string;
  limit?: string;
  category?: string;
  subcategory?: string;
  offset?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: ProductsSort;
  sortBy?: ProductsSortBy;
}

export enum ProductsSortBy {
  PRICE = "price",
  RATING = "rating",
}

export enum ProductsSort {
  ASC = "asc",
  DESC = "desc",
}
