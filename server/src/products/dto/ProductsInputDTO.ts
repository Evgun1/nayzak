import { ProductQuery } from "../interfaces/ProductQuery";
import { IsNumberString } from "class-validator";

export default class ProductQueryDTO implements ProductQuery {
  @IsNumberString()
  public id?: number;

  @IsNumberString()
  public page?: string;

  @IsNumberString()
  public limit?: string;

  @IsNumberString()
  public category?: string;

  public subcategory?: string;
  public offset?: string;
  public search?: string;
  public minPrice?: string;
  public maxPrice?: string;
  public sort?: "asc" | "desc";
  public sortBy?: string;
}

