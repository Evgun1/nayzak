import { NewProductsCacheDTO } from "src/feature/products/cache/dto/newProductsCache.dto";
import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { ProductCacheDTO } from "./dto/productCache.dto";
import { PrismaService } from "../../prisma/prisma.service";

import { ProductsAllDTO } from "./dto/productsAll.dto";
import { ProductDTO } from "./dto/product.dto";
import { ClientApiService } from "src/client-api/clientApi.service";
import { RedisService } from "src/redis/redis.service";
import { ProductPrisma } from "./prisma/product.prisma";
import { ProductsPrismaArgs } from "./prisma/interface/productsPrismaArgs.interface";
import { ProductsWhereInput } from "src/prisma/interface/where";
import {
	ValidationProductsKafkaPayloadDTO,
	ValidationProductsKafkaRatingPayloadDTO,
} from "./validation/validationKafkaProducts";
import { ValidationMinMaxPriceArgs } from "./validation/validationMinMaxPice";
import { ValidationProductParamDTO } from "./validation/validationProduct";
import { ValidationProductsAllQueryDTO } from "./validation/validationProductsAll";
import { ValidationUploadProductBodyDTO } from "./validation/validationProductUpload";
import { ValidationProductUpdateBodyDTO } from "./validation/validationProductUpdate";
import {
	ValidationProductsByParamsParamDTO,
	ValidationProductsByParamsQueryDTO,
} from "./validation/validationProductsByParams";
import { ProductsKafkaDTO } from "./dto/productsKafka.dto";
import { ProductsCacheService } from "./cache/productsCache.service";
import { KafkaService } from "src/kafka/kafka.service";
import { ProductsOrderBy } from "src/prisma/interface/orderBy";
import { QueryService } from "src/query/query.service";
import { ClientGrpc } from "@nestjs/microservices";
import { GrpcService } from "src/grpc/grpc.service";
import { ProductsModel } from "./products.model";
import { MediaModel } from "src/graphql/models/media.model";

export type GetProductsAllParams = Partial<ValidationProductsByParamsQueryDTO> &
	Partial<ValidationProductsByParamsParamDTO> &
	ValidationProductsAllQueryDTO;

@Injectable()
export class ProductsService {
	constructor(
		private readonly grpc: GrpcService,
		private readonly queryService: QueryService,
		private readonly kafka: KafkaService,
		private readonly productsCache: ProductsCacheService,
		private readonly productPrisma: ProductPrisma,
		private readonly clientApi: ClientApiService,
		private readonly redis: RedisService,
		private readonly prisma: PrismaService,
	) {}

	async getProductsAll(params: GetProductsAllParams) {
		const orderBy: ProductsOrderBy = {};
		const where: ProductsWhereInput = {};
		const whereAnd: ProductsWhereInput[] = [];

		if (params.search) {
			where.title = `*${params.search}*`;
		}
		if (params.productsId) {
			where.id = {
				in: params.productsId,
			};
		}
		if (params.categoryId) {
			if (!Number.isNaN(+params.categoryId)) {
				where.categoriesId = +params.categoryId;
			} else {
				where.Categories = { title: `*${params.categoryId}*` };
			}
		}
		if (params.subcategoryId) {
			if (!Number.isNaN(+params.subcategoryId)) {
				where.subcategoriesId = +params.subcategoryId;
			} else {
				where.Subcategories = {
					title: `*${params.subcategoryId}*`,
				};
			}
		}
		if (params.minPrice && params.maxPrice) {
			where["ROUND(price - price * discount / 100)"] = {
				between: [+params.minPrice, +params.maxPrice],
			};
		}
		if (params.color) {
			whereAnd.push({
				ProductsAttribute: {
					AttributeDefinitions: {
						id: {
							in: params.color,
						},
					},
				},
			});
		}
		if (params.material) {
			whereAnd.push({
				ProductsAttribute: {
					AttributeDefinitions: {
						id: {
							in: params.material,
						},
					},
				},
			});
		}
		if (params.manufacturer) {
			whereAnd.push({
				ProductsAttribute: {
					AttributeDefinitions: {
						id: {
							in: params.manufacturer,
						},
					},
				},
			});
		}

		where.AND = [...whereAnd];

		const offset =
			params.page && params.limit
				? (params.page - 1) * params.limit
				: params.offset;

		if (params.sortBy && params.sort) {
			if (params.sortBy?.includes("pice")) {
				orderBy["ROUND(price - price * discount / 100)"] = params.sort;
			} else if (params.sortBy.includes("rating")) {
				orderBy.ProductsRating = { avg: params.sort };
			} else {
				orderBy[params.sortBy] = params.sort;
			}
		}

		const args = {
			includes: {
				Media: { src: true, name: true },
				Categories: { id: true, title: true },
				Subcategories: { id: true, title: true },
			},
			where: where,
			limit: params.limit,
			offset,
			orderBy,
		} as ProductsPrismaArgs;

		const products = await this.productPrisma.getProducts(args);

		const productIds = products.map((i) => i.id);
		const categoryIds = products.map((i) => i.categoriesId);
		const subcategoryIds = products.map((i) => i.subcategoriesId);

		const grpcRatingAvg = await this.grpc.reviewService.getAvgRating({
			productIds,
		});

		const grpcProductsMedia =
			await this.grpc.mediaService.getProductsMediaAll({
				productIds,
			});
		const grpcCategoriesMedia =
			await this.grpc.mediaService.getCategoriesMediaAll({ categoryIds });
		const grpcSubcategoriesMedia =
			await this.grpc.mediaService.getSubcategoriesMediaAll({
				subcategoryIds,
			});

		const productsDTO = products.reduce((acc, curr) => {
			const ratingById = grpcRatingAvg.items.find(
				(item) => item.productId === curr.id,
			);

			const category = curr.Categories;
			const subcategory = curr.Subcategories;

			const findMediaProduct = grpcProductsMedia.products.find(
				(i) => i?.productId === curr.id,
			);
			const findMediaCategory = grpcCategoriesMedia.categories.find(
				(i) => i?.categoryId === curr.categoriesId,
			);
			const findMediaSubcategory =
				grpcSubcategoriesMedia.subcategories.find(
					(i) => i?.subcategoryId === curr.subcategoriesId,
				);

			const productsMedia = findMediaProduct?.media.map(
				(item) =>
					new MediaModel({
						src: item.src.toString("base64"),
						plaiceholder: item.plaiceholder.toString("base64"),
						alt: item.alt,
					}),
			);

			const categoryMedia = findMediaCategory?.media
				? new MediaModel({
						alt: findMediaCategory.media.alt,
						src: findMediaCategory.media.src.toString("base64"),
						plaiceholder:
							findMediaCategory.media.plaiceholder.toString(
								"base64",
							),
					})
				: undefined;
			const subcategoryMedia = findMediaSubcategory?.media
				? new MediaModel({
						alt: findMediaSubcategory.media.alt,
						src: findMediaSubcategory.media.src.toString("base64"),
						plaiceholder:
							findMediaSubcategory.media.plaiceholder.toString(
								"base64",
							),
					})
				: undefined;

			acc.push(
				new ProductsModel({
					...curr,
					Media: productsMedia,
					Categories: {
						id: category.id,
						title: category.title,
						Media: categoryMedia,
					},
					Subcategories: {
						id: subcategory.id,
						title: subcategory.title,
						Media: subcategoryMedia,
					},

					rating: ratingById?.avgRating
						? {
								avg: ratingById.avgRating,
								count: grpcRatingAvg.count,
							}
						: undefined,
				}),
			);

			return acc;
		}, [] as ProductsModel[]);

		for (const product of products) {
		}

		const count = await this.productPrisma.getProductsCount(args);

		return { products: productsDTO, productCounts: count };
	}

	async getProduct(param: ValidationProductParamDTO) {
		const { id } = param;
		const cacheKey = `product-${id}`;

		const thirtyMin = 60 * 30;
		const productCache = await this.redis.get<ProductCacheDTO>(cacheKey);

		const setProductCache = async (
			value: ProductCacheDTO,
			second: number = 60 * 30,
		) => {
			const { count, product } = value;

			const productCacheDTO = new ProductCacheDTO({ count });

			if (productCache?.count && productCache.count < 10) {
				return await this.redis.set(
					cacheKey,
					{ count: productCacheDTO.count },
					second,
				);
			}

			if (
				productCache &&
				!productCache.product &&
				productCache.count >= 10
			) {
				if (product) productCacheDTO.product = product;
				return await this.redis.set(cacheKey, productCacheDTO, second);
			}

			return await this.redis.set(cacheKey, value, second);
		};

		if (productCache && productCache.product) {
			const ttl = await this.redis.ttl(cacheKey);
			await setProductCache(
				{
					count: ++productCache.count,
					product: productCache.product,
				},
				ttl === -1 ? 0 : ttl,
			);

			if (Number.isInteger(10 / productCache.count)) {
				await this.redis.expire(cacheKey, thirtyMin);
			}

			return productCache.product;
		}

		const product = await this.prisma.products.findUnique({
			include: {
				Categories: { select: { title: true, id: true } },
				Subcategories: { select: { title: true, id: true } },
				ProductsRating: { select: { avg: true, count: true } },
			},

			where: { id },
		});
		if (!product) return;

		const ratings = await this.grpc.reviewService.getAvgRating({
			productIds: [product.id],
		});
		const [rating] = ratings.items;

		const grpcProductMedia =
			await this.grpc.mediaService.getProductsMediaOne({
				productId: product.id,
			});

		const media = grpcProductMedia?.media.map(
			(item) =>
				new MediaModel({
					src: item.src.toString("base64"),
					plaiceholder: item.plaiceholder.toString("base64"),
					alt: item.alt,
				}),
		);

		const categoryMedia =
			await this.grpc.mediaService.getCategoriesMediaOne({
				categoryId: product.categoriesId,
			});

		const productCacheDTO = new ProductCacheDTO({
			count: productCache?.count ? ++productCache.count : 1,
			product: {
				...product,
				Categories: {
					id: product.Categories.id,
					title: product.Categories.title,
					Media: categoryMedia?.media
						? {
								alt: categoryMedia?.media.alt,
								src: categoryMedia?.media.src.toString(
									"base64",
								),
								plaiceholder:
									categoryMedia?.media.plaiceholder.toString(
										"base64",
									),
							}
						: undefined,
				},
				Subcategories: {
					id: product.Subcategories.id,
					title: product.Subcategories.title,
				},
				Media: media,
				rating: {
					avg: rating?.avgRating ?? 0,
					count: ratings?.count ?? 0,
				},
			},
		});

		await setProductCache(productCacheDTO);
		return productCacheDTO.product;
	}

	async getNewProducts() {
		// const cacheProducts = await this.productsCache.getCacheNewProducts();

		// if (cacheProducts.length >= 6) return cacheProducts;

		const products = await this.getProductsAll({
			sortBy: "createdAt",
			sort: "DESC",
			limit: 6,
		});

		const ratingsGrpc = await this.grpc.reviewService.getAvgRating({
			productIds: products.products.map((product) => product.id),
		});

		const newProductsCacheDTO = products.products.map((product) => {
			const rating = ratingsGrpc.items.find(
				(item) => item.productId === product.id,
			);

			return new ProductsModel({
				...product,
				Categories: {
					id: product.Categories.id,
					title: product.Categories.title,
				},
				Subcategories: {
					id: product.Subcategories.id,
					title: product.Subcategories.title,
				},
				rating: rating
					? {
							avg: rating.avgRating,
							count: ratingsGrpc.count,
						}
					: undefined,
			});
		});

		// await this.productsCache.uploadCacheNewProducts(newProductsCacheDTO);
		return newProductsCacheDTO;
	}

	async getMinMaxPrice(params: ValidationMinMaxPriceArgs) {
		const { categoryId, subcategoryId } = params;

		const args: Prisma.ProductsFindManyArgs = {
			select: { price: true, discount: true },
		};

		if (!Number.isNaN(categoryId) && !Number.isNaN(categoryId)) {
			args.where = {
				categoriesId: categoryId,
				subcategoriesId: subcategoryId,
			};
		} else {
			args.where = {
				Categories: {
					id: categoryId,
				},
			};
			args.where = {
				Subcategories: {
					id: subcategoryId,
				},
			};
		}

		const products = await this.prisma.products.findMany(args);

		const minPrice = Math.floor(
			Math.min(
				...products.map(
					(value) =>
						value.price -
						(value.price * (value.discount ?? 0)) / 100,
				),
			),
		);
		const maxPrice = Math.floor(
			Math.max(
				...products.map(
					(value) =>
						value.price -
						(value.price * (value.discount ?? 0)) / 100,
				),
			),
		);

		return { minPrice, maxPrice };
	}

	async uploadMany(body: any[]) {
		const products = await this.prisma.products.createManyAndReturn({
			data: body,
		});

		await this.clientApi.clearCache("products");
		return products;
	}

	async uploadProduct(body: ValidationUploadProductBodyDTO) {
		const product = await this.prisma.products.create({
			data: {
				description: body.description,
				discount: body.discount ?? 0,
				price: body.price,
				title: body.title,
				status: body.status,
				categoriesId: body.categoriesId,
				subcategoriesId: body.subcategoriesId,
			},
			select: {
				categoriesId: true,
				createdAt: true,
				description: true,
				discount: true,
				id: true,
				price: true,
				status: true,
				title: true,
				subcategoriesId: true,
				updatedAt: true,
				Media: { select: { src: true } },
			},
		});

		await this.clientApi.clearCache("products");
		return product;
	}

	async updateProduct(body: ValidationProductUpdateBodyDTO) {
		const product = await this.prisma.products.update({
			include: {
				Media: { select: { src: true, name: true } },
				ProductsRating: { select: { avg: true, count: true } },
				Categories: true,
				Subcategories: true,
			},
			where: { id: body.id },
			data: { ...body },
		});

		const grpcProductMedia =
			await this.grpc.mediaService.getProductsMediaOne({
				productId: product.id,
			});

		const media = grpcProductMedia?.media.map(
			(item) =>
				new MediaModel({
					src: item.src.toString("base64"),
					plaiceholder: item.plaiceholder.toString("base64"),
					alt: item.alt,
				}),
		);

		const productDTO = new ProductsModel({
			...product,
			rating: {
				avg: product.ProductsRating?.avg ?? 0,
				count: product.ProductsRating?.count ?? 0,
			},
			Media: media,
		});

		await this.productsCache.updateProductCache(productDTO);
		await this.clientApi.clearCache("products");
		return product;
	}

	// async getProductCatalog(payload: ValidationProductsKafkaPayloadDTO) {
	// 	const { products } = await this.getProductsAll({
	// 		productsId: payload.productsId,
	// 	});
	// 	const productsKafkaDTO = products.map(
	// 		(product) => new ProductsKafkaDTO({ ...product }),
	// 	);
	// 	return productsKafkaDTO;
	// }

	// async updateRatingProduct(
	// 	payload: ValidationProductsKafkaRatingPayloadDTO,
	// ) {
	// 	const productsRating = await this.prisma.productsRating.findFirst({
	// 		where: { Products: { id: payload.productsId } },
	// 	});

	// 	if (productsRating) {
	// 		await this.prisma.productsRating.update({
	// 			where: { id: productsRating.id },
	// 			data: {
	// 				avg: payload.avg,
	// 				count: payload.count,
	// 			},
	// 		});
	// 	} else {
	// 		const productsRating = await this.prisma.productsRating.create({
	// 			data: {
	// 				avg: payload.avg,
	// 				count: payload.count,
	// 			},
	// 		});

	// 		await this.updateProduct({
	// 			id: payload.productsId,
	// 			productsRatingId: productsRating.id,
	// 		});
	// 	}

	// 	const product = await this.getProduct({
	// 		id: payload.productsId,
	// 	});

	// 	if (product) {
	// 		await this.productsCache.updateProductCache(product);
	// 		await this.clientApi.clearCache("products");
	// 	}

	// await this.prisma.productsRating.update({
	// 	where: { },
	// 	data: {},
	// });

	// await this.prisma.products.update({
	// 	where: {
	// 		id: payload.productsId,
	// 	},
	// 	data: {
	// 		ProductsRating: {
	// 			update: {
	// 				data: {
	// 					avg: payload.avg,
	// 					count: payload.count,
	// 				},
	// 			},
	// 		},
	// 	},
	// });
	// });
	// await this.prisma.productsRating.update({
	// 	where: { id },
	// 	data: {
	// 		avg: productsRatingDTO.rating.avg,
	// 		count: productsRatingDTO.rating.count,
	// 	},
	// });
	// await this.productsCache.uploadCacheProductRating(productsRatingDTO);
}

// @Cron("* * * * * 1")
// async checkCachePopularProduct() {
// 	const redisKey = "popular-products";
// 	const weekAgo = new Date();
// 	weekAgo.setDate(weekAgo.getDate() - 7);
// 	const cachePopularProducts =
// 		await this.redis.hGetAll<PopularProductsCacheDTO>(redisKey);

// 	const popularProductsFields: string[] = [];
// 	if (!cachePopularProducts) return;

// 	for (const element of cachePopularProducts) {
// 		Object.values(element).forEach((data) => {
// 			const createCacheAt = new Date(data.updateAt);

// 			if (createCacheAt <= weekAgo) {
// 				Object.keys(element).forEach((field) => {
// 					popularProductsFields.push(field);
// 				});
// 			}
// 		});
// 	}

// 	if (popularProductsFields.length <= 0) {
// 		return await this.redis.hDel(redisKey, popularProductsFields);
// 	}
// }
// }
