import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
	ValidationAttributeByParamParamDTO,
	ValidationAttributeByParamQueryDTO,
} from "./validation/validationAttributeByParam.dto";
import { Prisma } from "@prisma/client";
import {
	GetProductsAllParams,
	ProductsService,
} from "../products/products.service";
import { AttributeDTO } from "./dto/attribute.dto";
import { ValidationAttributeUploadBodyDTO } from "./validation/validationAttributeUpload.dto";
import { ValidationAttributesQueryDTO } from "./validation/validationAttributes.dto";
import { QueryService } from "src/query/query.service";

@Injectable()
export class AttributeDefinitionsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productsService: ProductsService,
		private query: QueryService,
	) {}

	async getAll(query: ValidationAttributesQueryDTO) {
		const queryHandler = this.query.getQuery("AttributeDefinitions", query);

		const ids: number[] = [];

		if (query.color) ids.push(...ids, ...query.color);
		if (query.material) ids.push(...ids, ...query.material);
		if (query.manufacturer) ids.push(...ids, ...query.manufacturer);

		const where: Prisma.AttributeDefinitionsWhereInput = {
			...queryHandler.where,
			id: { in: ids },
		};

		const attributeArgs: Prisma.AttributeDefinitionsFindManyArgs = {
			where,
		};

		const attributes =
			await this.prisma.attributeDefinitions.findMany(attributeArgs);

		console.log(attributes);

		return attributes;
	}

	async getByParam(
		param: ValidationAttributeByParamParamDTO,
		query: ValidationAttributeByParamQueryDTO,
	) {
		const { subcategoryId } = param;

		const where: Prisma.AttributeDefinitionsWhereInput = {
			subcategoriesId: subcategoryId,
		};

		const attribute = await this.prisma.attributeDefinitions.findMany({
			include: {
				ProductAttribute: {
					include: { Products: { select: { id: true } } },
				},
			},
			where: {
				...where,
			},
		});

		const { productCounts } = await this.productsService.getProductsAll({
			...query,
			subcategoryId,
		});
		const attributeDTO: {
			attribute: AttributeDTO[];
			count: number;
		} = { attribute: [], count: productCounts };

		for (const element of attribute) {
			const productsArgs: GetProductsAllParams = {
				subcategoryId,
				...query,
			};

			const attrId = element.id;
			const type = element.name.toLowerCase();

			if (type.includes("color")) {
				productsArgs.color = [attrId];
			}
			if (type.includes("material")) {
				productsArgs.material = [attrId];
			}
			if (type.includes("manufacture")) {
				productsArgs.manufacturer = [attrId];
			}

			const products =
				await this.productsService.getProductsAll(productsArgs);

			const isActive = products.products.length > 0;

			attributeDTO.attribute.push(
				new AttributeDTO({ ...element, active: isActive }),
			);
		}

		return {
			attribute: attributeDTO.attribute,
			countActiveAttributes: productCounts,
		};
	}

	async createMany(body: ValidationAttributeUploadBodyDTO[]) {
		const attribute =
			await this.prisma.attributeDefinitions.createManyAndReturn({
				data: body,
			});

		return attribute;
	}
}
