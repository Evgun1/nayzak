import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { CreateUsersService } from "./createUsers.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule],
	providers: [CreateUsersService],
})
export class CreateUsersModule {}
