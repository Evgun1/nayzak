import * as jwt from "jsonwebtoken";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { RedisService } from "src/redis/redis.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RegistrationMiddleware implements NestMiddleware {
	constructor(
		private readonly prisma: PrismaService,
		private readonly redis: RedisService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const body = req.body.payload;
		const decode = jwt.decode(body);
		req.body = decode;

		next();
	}
}
