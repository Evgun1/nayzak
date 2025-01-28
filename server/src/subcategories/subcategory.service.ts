import { Prisma } from '@prisma/client';
import prismaClient from '../prismaClient';
import categoriesService from '../categories/categories.service';
import {
	SubcategoriesGeDTO,
	SubcategoriesGetParams,
	SubcategoriesGetQuery,
	SubcategoryByCategoryGetParams,
} from './subcategories.type';
import { MainService } from '../utils/service/main.service';
import { QueryParameterTypes } from '../utils/service/service.type';
import { QueryParamHandler } from '../utils/query-params/QueryParams.service';

class SubcategoriesOption {
	async getAllSubcategoryWhere(subcategoryGetGTO: SubcategoriesGetQuery) {
		const where: Prisma.SubcategoriesWhereInput = {};

		if (subcategoryGetGTO.category) {
			const category = await categoriesService.getCategoryIDByTitle(
				subcategoryGetGTO.category
			);

			where.categoriesId = category?.id;
		}

		return where;
	}

	async getSubcategoryByTitleWhere(
		subcategoryGetParamGTO: SubcategoryByCategoryGetParams
	) {
		const where: Prisma.SubcategoriesWhereInput = {};

		if (subcategoryGetParamGTO.categoryName) {
			const category = await categoriesService.getCategoryIDByTitle(
				subcategoryGetParamGTO.categoryName
			);

			where.categoriesId = category?.id;
		}

		return where;
	}
}

class SubcategoriesService {
	protected supportedMimeTypes: Map<
		boolean,
		(data: string | number) => object
	> = new Map();

	constructor() {
		this.setupMimeTypes();
	}

	private setupMimeTypes() {
		this.supportedMimeTypes.set(false, (data: string | number) => ({
			id: data.toString(),
		}));
		this.supportedMimeTypes.set(true, (data: string | number) => ({
			title: data,
		}));
	}

	private subcategoriesOptions = new SubcategoriesOption();
	private mainService = new MainService();
	private queryParams = new QueryParamHandler();

	async getAllSubcategories(inputData: QueryParameterTypes) {
		const where = this.queryParams.filter<Prisma.SubcategoriesWhereInput>(
			inputData,
			Prisma.SubcategoriesScalarFieldEnum
		);
		where.Categories = {
			title: { contains: inputData.category, mode: 'insensitive' },
		};

		const skip = this.queryParams.offset(inputData);
		const orderBy =
			this.queryParams.orderBy<Prisma.SubcategoriesOrderByWithRelationInput>(
				inputData,
				Prisma.SubcategoriesScalarFieldEnum
			);
		const take = this.queryParams.limit(inputData);

		const queryOptions: Prisma.SubcategoriesFindManyArgs = {
			where,
			skip,
			orderBy,
			take,
		};

		const subcategories =
			await prismaClient.subcategories.findMany(queryOptions);
		const totalCount = await prismaClient.subcategories.count({
			where: queryOptions.where,
		});

		return { subcategories, totalCount };
	}

	async getOne({ subcategoriesParam }: SubcategoriesGetParams) {
		if (!subcategoriesParam) return;

		const subcategoriesData = this.supportedMimeTypes.get(
			isNaN(Number(subcategoriesParam))
		);

		if (!subcategoriesData) return;
		const inputData = subcategoriesData(
			subcategoriesParam
		) as QueryParameterTypes;

		const where = this.queryParams.filter<Prisma.SubcategoriesWhereInput>(
			inputData,
			Prisma.SubcategoriesScalarFieldEnum
		);

		const options: Prisma.SubcategoriesFindFirstArgs = {
			where,
		};

		const subcategories = await prismaClient.subcategories.findFirst(options);

		return subcategories;
	}

	async getSubcategoryByCategory(inputData: SubcategoryByCategoryGetParams) {
		const where: Prisma.SubcategoriesWhereInput = {
			Categories: { title: inputData.categoryName },
		};

		const totalCount = await prismaClient.subcategories.count({ where });
		const subcategories = await prismaClient.subcategories.findMany({
			where,
		});

		return { subcategories, totalCount };
	}

	async getSubcategoryIDByTitle(subcategoryTitle: string) {
		return prismaClient.subcategories.findFirst({
			where: {
				title: subcategoryTitle
					? subcategoryTitle[0].toUpperCase() + subcategoryTitle.slice(1)
					: '',
			},
			select: { id: true },
		});
	}

	async create(body: SubcategoriesGeDTO) {
		return prismaClient.subcategories.create({
			data: {
				title: body.title,
				categoriesId: parseInt(body.categoriesId.toString()),
			},
		});
	}

	async deleteSubcategories(subcategoriesId: number | number[]) {
		return await this.mainService.delete('Subcategories', subcategoriesId);
	}
}

export default new SubcategoriesService();
