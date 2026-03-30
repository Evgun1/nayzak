import { Injectable } from "@nestjs/common";
import { PrismaService } from "./services/prisma.service";
import { Media, Prisma } from "@prisma/client";
import { GetProductsMediaOneResponse, IMedia } from "./grpc/type/media.grpc";

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}
	async getHello() {}
}
