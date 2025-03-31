export class ProductQueryDTO {
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

  constructor(inputData: Record<string, string>) {
    for (const key in inputData) {
      if (this.hasOwnProperty(key)) {
        this[key as keyof ProductQueryDTO] = inputData[key];
      }
    }
  }
}
