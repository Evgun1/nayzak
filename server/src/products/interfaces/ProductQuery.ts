export interface ProductQuery {
  id?: number;
  page?: string;
  limit?: string;
  category?: string;
  subcategory?: string;
  offset?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: "asc" | "desc";
  sortBy?: string;
}

export enum ProductsSortBy {
  ID = "id",
  TITLE = "title",
  PRICE = "price",
  // RATING = "rating",
  DESCRIPTION = "description",
  DISCOUNT = "discount",
  MAIN_PRICE = "mainPrice",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  STATUS = "status",
  CATEGORIES_ID = "categoriesId",
  SUBCATEGORIES_ID = "subcategoriesId",
  BRANDS_ID = "brandsId",
}
