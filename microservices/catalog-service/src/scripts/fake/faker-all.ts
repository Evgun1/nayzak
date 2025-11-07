import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { FakerService } from "src/tools/fake/faker.service";

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule, {
		logger: false,
	});
	const faker = app.get(FakerService);
	await faker.generateCategoriesFaker();
	await faker.generateSubcategoriesFaker();
	await faker.generateProductsFaker();
	await faker.generateAttributeFaker();
	await faker.generateMediaFaker();
	await app.close();
	process.exit(0);
}
bootstrap();
