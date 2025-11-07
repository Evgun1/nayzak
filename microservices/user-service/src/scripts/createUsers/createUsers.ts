import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { CreateUsersService } from "src/tools/createUsers/createUsers.service";

async function createUsers() {
	const app = await NestFactory.createApplicationContext(AppModule, {
		logger: false,
	});
	const create = app.get(CreateUsersService);
	await create.createUsers();
	await app.close();
	process.exit(0);
}

createUsers();
