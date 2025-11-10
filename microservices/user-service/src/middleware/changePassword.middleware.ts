import * as jwt from "jsonwebtoken";
import {
	BadRequestException,
	HttpException,
	Injectable,
	NestMiddleware,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ValidationChangePasswordBodyDTO } from "src/validation/validationChangePassword.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ChangePasswordMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: (error?: any) => void) {
		const token = req.body.payload;
		const data = jwt.decode(token);
		req.body = data;
		next();
	}
}
