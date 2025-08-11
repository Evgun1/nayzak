import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";
import { CategoriesGetParam, CategoryGetDTO } from "./categories.type";
import { QueryParamHandler } from "../utils/query-params/QueryParams.service";
import { QueryParameterTypes } from "../utils/service/service.type";

class CategoriesService {
	private queryParams = new QueryParamHandler();

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

	async getAllCategories(inputData: QueryParameterTypes) {
		const skip = this.queryParams.offset({ offset: inputData.offset });
		const take = this.queryParams.limit({ limit: inputData.limit });
		const orderBy =
			this.queryParams.orderBy<Prisma.CategoriesOrderByWithRelationInput>(
				inputData,
				Prisma.CategoriesScalarFieldEnum,
			);

		const queryOptions: Prisma.CategoriesFindManyArgs = {
			skip,
			take,
			orderBy,
		};

		const categories = await prismaClient.categories.findMany(queryOptions);
		const categoriesCounts = await prismaClient.categories.count({
			where: queryOptions.where,
		});

		return { categoriesCounts, categories };
	}

	async getOne({ categoryParams }: CategoriesGetParam) {
		if (!categoryParams) return;

		const subcategoriesData = this.supportedMimeTypes.get(
			isNaN(Number(categoryParams)),
		);

		if (!subcategoriesData) return;
		const inputData = subcategoriesData(
			categoryParams,
		) as QueryParameterTypes;

		const where = this.queryParams.filter<Prisma.CategoriesWhereInput>(
			inputData,
			Prisma.SubcategoriesScalarFieldEnum,
		);

		const options: Prisma.CategoriesFindFirstArgs = {
			where,
		};

		const subcategories = await prismaClient.categories.findFirst(options);

		return subcategories;
	}

	async getCategoryIDByTitle(categoriesTitles: string) {
		return prismaClient.categories.findFirst({
			where: {
				title: categoriesTitles
					? categoriesTitles[0].toUpperCase() +
						categoriesTitles.slice(1)
					: "",
			},
			select: { id: true },
		});
	}

	async create(body: CategoryGetDTO) {
		return prismaClient.categories.create({ data: body });
	}

	async change(categoryData: CategoriesGetParam & CategoryGetDTO) {
		const { categoryParams, title } = categoryData;

		return prismaClient.categories.update({
			where: { id: parseInt(categoryParams as string) },
			data: { title },
		});
	}
}

export default new CategoriesService();
