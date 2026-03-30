import { Injectable } from "@nestjs/common";

import {
	GetCategoriesMediaAllResponse,
	GetCategoriesMediaOneResponse,
	GetCustomersMediaAllResponse,
	GetCustomersMediaOneResponse,
	GetProductsMediaAllResponse,
	GetProductsMediaOneRequest,
	GetProductsMediaOneResponse,
	GetSubcategoriesMediaAllResponse,
	GetSubcategoriesMediaOneResponse,
	IMedia,
} from "./type/media.grpc";
import {
	ValidationGetCategoriesAll,
	ValidationGetCategoriesOne,
} from "./validation/validationGetCategoriesMedia";
import {
	ValidationGetSubcategoriesAll,
	ValidationGetSubcategoriesOne,
} from "./validation/validationGetSubcategoriesMedia";
import {
	ValidationGetProductsAll,
	ValidationGetProductsOne,
} from "./validation/validationGetProductsMedia";
import {
	ValidationGetCustomersAll,
	ValidationGetCustomersOne,
} from "./validation/validationGetCustomersMedia";
import { PrismaService } from "src/services/prisma.service";
import { NEVER } from "rxjs";

@Injectable()
export class GrpcService {
	constructor(private readonly prisma: PrismaService) {}

	async getCategoriesMediaAll(
		data: ValidationGetCategoriesAll,
	): Promise<GetCategoriesMediaAllResponse> {
		const { categoryIds } = data;

		const categoriesMedia = await this.prisma.media.findMany({
			include: { categoriesMedia: true },
			where: { categoriesMedia: { categoriesId: { in: categoryIds } } },
		});

		const categories = categoriesMedia.map<GetCategoriesMediaOneResponse>(
			(media) => {
				const bufferSrc = Buffer.from(media.src);
				const bufferPlaiceholder = Buffer.from(media.plaiceholder);

				return {
					categoryId: media.categoriesMedia?.categoriesId as number,
					media: {
						id: media.id,
						alt: media.name,
						plaiceholder: bufferSrc,
						src: bufferSrc,
					},
				};
			},
		);

		return { categories };
	}
	async getCategoriesMediaOne(
		data: ValidationGetCategoriesOne,
	): Promise<GetCategoriesMediaOneResponse> {
		const { categoryId } = data;
		const categoryMedia = await this.prisma.media.findFirst({
			include: { categoriesMedia: true },
			where: { categoriesMedia: { categoriesId: categoryId } },
		});

		if (!categoryMedia || !categoryMedia.categoriesMedia?.categoriesId)
			return undefined;
		const bufferSrc = Buffer.from(categoryMedia?.src);
		const bufferPlaiceholder = Buffer.from(categoryMedia?.plaiceholder);

		return {
			categoryId: categoryMedia.categoriesMedia.categoriesId,
			media: {
				alt: categoryMedia.name,
				id: categoryMedia.id,
				plaiceholder: bufferSrc,
				src: bufferPlaiceholder,
			},
		};
	}

	async getSubcategoriesMediaAll(
		data: ValidationGetSubcategoriesAll,
	): Promise<GetSubcategoriesMediaAllResponse> {
		const { subcategoryIds } = data;
		const subcategoriesMedia = await this.prisma.media.findMany({
			include: { subcategoriesMedia: true },
			where: {
				subcategoriesMedia: {
					subcategoriesId: { in: subcategoryIds },
				},
			},
		});

		const subcategories =
			subcategoriesMedia.map<GetSubcategoriesMediaOneResponse>(
				(media) => {
					const bufferSrc = Buffer.from(media.src);
					const bufferPlaiceholder = Buffer.from(media.plaiceholder);

					return {
						subcategoryId: media.subcategoriesMedia
							?.subcategoriesId as number,
						media: {
							id: media.id,
							alt: media.name,
							plaiceholder: bufferSrc,
							src: bufferPlaiceholder,
						},
					};
				},
			);

		return { subcategories };
	}
	async getSubcategoriesMediaOne(
		data: ValidationGetSubcategoriesOne,
	): Promise<GetSubcategoriesMediaOneResponse> {
		const { subcategoryId } = data;

		const subcategoriesMedia = await this.prisma.media.findFirst({
			include: { subcategoriesMedia: true },
			where: {
				subcategoriesMedia: {
					subcategoriesId: subcategoryId,
				},
			},
		});

		if (!subcategoriesMedia || !subcategoriesMedia.subcategoriesMedia)
			return undefined;

		const bufferSrc = Buffer.from(subcategoriesMedia?.src);
		const bufferPlaiceholder = Buffer.from(subcategoriesMedia.plaiceholder);

		return {
			subcategoryId:
				subcategoriesMedia.subcategoriesMedia.subcategoriesId,
			media: {
				alt: subcategoriesMedia.name,
				id: subcategoriesMedia.id,
				plaiceholder: bufferSrc,
				src: bufferPlaiceholder,
			},
		};
	}

	async getProductsMediaAll(
		data: ValidationGetProductsAll,
	): Promise<GetProductsMediaAllResponse> {
		const { productIds } = data;

		const productsMedia = await this.prisma.media.findMany({
			include: { productsMedia: true },
			where: {
				productsMedia: { every: { productsId: { in: productIds } } },
			},
		});

		const result = productsMedia.reduce(
			(acc, cur) => {
				cur.productsMedia.forEach(({ productsId }) => {
					const productId = productsId;

					let group = acc.find((g) => g.productId === productId);

					if (!group) {
						group = { productId, media: [] };
						acc.push(group);
					}

					group.media.push({
						id: cur.id,
						src: Buffer.from(cur.src),
						alt: cur.name,
						plaiceholder: Buffer.from(cur.plaiceholder),
					});
				});

				return acc;
			},
			[] as { productId: number; media: IMedia[] }[],
		);

		return {
			products: result,
		};
	}
	async getProductsMediaOne(
		data: ValidationGetProductsOne,
	): Promise<GetProductsMediaOneResponse> {
		const productsMedia = await this.prisma.productsMedia.findMany({
			include: { Media: true },
			omit: { mediaId: true, productsId: true },
			where: { productsId: data.productId },
		});

		const media: IMedia[] = productsMedia.map(({ Media }) => {
			const bufferSrc = Buffer.from(Media.src);
			const bufferPlaiceholder = Buffer.from(Media.plaiceholder);

			return {
				id: Media.id,
				alt: Media.name,
				src: bufferSrc,
				plaiceholder: bufferPlaiceholder,
			};
		});

		return {
			productId: data.productId,
			media,
		};
	}

	async getCustomersMediaAll(
		data: ValidationGetCustomersAll,
	): Promise<GetCustomersMediaAllResponse> {
		const { customerIds } = data;
		const customersMedia = await this.prisma.media.findMany({
			include: { customersMedia: true },
			where: { customersMedia: { customersId: { in: customerIds } } },
		});

		const customers = [] as GetCustomersMediaOneResponse[];

		for (const element of customersMedia) {
			if (!element.customersMedia?.customersId) continue;

			const bufferSrc = Buffer.from(element.src);
			const bufferPlaiceholder = Buffer.from(element.plaiceholder);

			customers.push({
				customerId: element.customersMedia.customersId,
				media: {
					id: element.id,
					alt: element.name,
					src: bufferSrc,
					plaiceholder: bufferPlaiceholder,
				},
			});
		}

		return {
			customers,
		};
	}
	async getCustomersMediaOne(
		data: ValidationGetCustomersOne,
	): Promise<GetCustomersMediaOneResponse> {
		const { customerId } = data;

		const customerMedia = await this.prisma.media.findFirst({
			include: { customersMedia: true },
			where: { customersMedia: { customersId: customerId } },
		});

		if (!customerMedia || !customerMedia.customersMedia) return;

		const bufferSrc = Buffer.from(customerMedia.src);
		const bufferPlaiceholder = Buffer.from(customerMedia.plaiceholder);

		return {
			customerId: customerMedia.customersMedia.customersId,
			media: {
				id: customerMedia.id,
				alt: customerMedia.name,
				src: bufferSrc,
				plaiceholder: bufferPlaiceholder,
			},
		};
	}
}
