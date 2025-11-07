import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";
import { QueryModule } from "src/query/query.module";

@Module({
	imports: [PrismaModule, QueryModule],
	controllers: [CredentialsController],
	providers: [CredentialsService],
	exports: [CredentialsService],
})
export class CredentialsModule {}
