import {
	Body,
	Controller,
	Get,
	Post,
	UploadedFile,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { FakerService } from "./tools/fake/faker.service";
import { faker } from "@faker-js/faker";
import { buffer } from "stream/consumers";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductsKafkaDTO } from "./feature/products/dto/productsKafka.dto";

@Controller("/")
export class AppController {
	constructor(
		private readonly cloudinaryService: CloudinaryService,
		private readonly fakerService: FakerService,
	) {}

	@Post("")
	@UseInterceptors(FilesInterceptor("files"))
	async test(
		@UploadedFiles() file: Array<Express.Multer.File>,
		@Body() body: any,
	) {}

	@MessagePattern("get.products.catalog")
	get(
		// @Payload(
		// 	new ValidationPipe({
		// 		exceptionFactory: validationExceptionFactory,
		// 	}),
		// )
		payload: ProductsKafkaDTO,
	) {
		console.log(payload);

		return "t";
	}
}
