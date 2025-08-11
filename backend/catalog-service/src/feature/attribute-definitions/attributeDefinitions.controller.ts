import { AttributeDefinitionsService } from "./attributeDefinitions.service";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ValidationAttributeUploadManyBodyDTO } from "./validation/validationAttributeUpload.dto";
import {
	ValidationAttributeByParamParamDTO,
	ValidationAttributeByParamQueryDTO,
} from "./validation/validationAttributeByParam.dto";

@Controller("attribute-definitions")
export class AttributeDefinitionsController {
	constructor(
		private readonly attributeDefinitionsService: AttributeDefinitionsService,
	) {}
	@Get("/:subcategoryId")
	async getAttributeByParam(
		@Param() param: ValidationAttributeByParamParamDTO,
		@Query() query: ValidationAttributeByParamQueryDTO,
	) {
		const result = await this.attributeDefinitionsService.getByParam(
			param,
			query,
		);

		return result;
	}

	@Post()
	async createMany(@Body() body: ValidationAttributeUploadManyBodyDTO) {
		return body;
	}
}
