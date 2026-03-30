import { $Enums, Prisma } from "@prisma/client";
import { ProductDTOItem, ProductDTOParam } from "../interface/productDTO";
import { ProductDTO } from "./product.dto";
import { IProductCache } from "../cache/interface/productCache";
import { ProductsModel } from "../products.model";

export class ProductCacheDTO {
	product?: ProductsModel;
	count: number;

	constructor(param: ProductCacheDTO) {
		const { product, count } = param;

		if (product) this.product = product;

		this.count = count;
	}
}
