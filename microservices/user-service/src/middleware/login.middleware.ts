import * as jwt from "jsonwebtoken";

import { Body, HttpException, NestMiddleware, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ValidationLoginBodyDTO } from "src/validation/validationLogin.dto";
import { PrismaService } from "src/prisma/prisma.service";

export class LoginMiddleware implements NestMiddleware {
	constructor(private readonly prisma: PrismaService) {}

	async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
		const payload = req.body.payload;
		const decode = jwt.decode(payload);

		req.body = decode;

		// const credentials = await this.prisma.credentials.findFirst({
		// 	where: { email },
		// 	select: { email: true, password: true },
		// });

		// if (!credentials) {
		// 	throw new HttpException("Incorrect email or password", 401);
		// }

		// const isPasswordEquals = await bcrypt.compare(
		// 	password,
		// 	credentials.password,
		// );

		// if (!isPasswordEquals) {
		// 	throw new HttpException("Incorrect email or password", 401);
		// }

		next();
	}
}
