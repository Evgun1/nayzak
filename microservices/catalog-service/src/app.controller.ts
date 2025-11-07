import { retry } from "rxjs";
import {
	Body,
	Controller,
	Get,
	Header,
	HttpCode,
	Post,
	Res,
	UploadedFile,
	UploadedFiles,
	UseInterceptors,
	ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { FakerService } from "./tools/fake/faker.service";
import { faker } from "@faker-js/faker";
import { buffer } from "stream/consumers";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductsKafkaDTO } from "./feature/products/dto/productsKafka.dto";
import { validationExceptionFactory } from "./utils/validationExceptionFactory";
import { ValidationProductsKafkaPayloadDTO } from "./feature/products/validation/validationKafkaProducts.dto";
import { Response } from "express";

@Controller()
export class AppController {
	constructor(
		private readonly cloudinaryService: CloudinaryService,
		private readonly fakerService: FakerService,
	) {}

	@Get("health")
	@HttpCode(200)
	async health() {
		return "healthy";
	}
}
