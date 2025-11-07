import { $Enums, Prisma } from "@prisma/client";
import { ProductDTOItem, ProductDTOParam } from "../interface/productDTO";
import { ProductDTO } from "./product.dto";
import { IProductCache } from "../cache/interface/productCache";

export class ProductCacheDTO {
	product?: ProductDTO;
	count: number;

	constructor(param: ProductCacheDTO) {
		const { product, count } = param;

		if (product) this.product = product;

		this.count = count;
	}
}
