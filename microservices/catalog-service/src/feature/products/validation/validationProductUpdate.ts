import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";
import { ValidationUploadProductBodyDTO as ValidationProductUploadBodyDTO } from "./validationProductUpload";

export class ValidationProductUpdateBodyDTO extends PartialType(
	ValidationProductUploadBodyDTO,
) {
	@Type(() => Number)
	@IsInt()
	id: number;
}
