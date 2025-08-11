import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AttributeDefinitionsController } from "./attributeDefinitions.controller";
import { AttributeDefinitionsService } from "./attributeDefinitions.service";
import { ProductsModule } from "../products/products.module";

@Module({
	imports: [PrismaModule, ProductsModule],
	controllers: [AttributeDefinitionsController],
	providers: [AttributeDefinitionsService],
	exports: [AttributeDefinitionsService],
})
export class AttributeDefinitionsModule {}
