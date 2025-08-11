import bcrypt from "bcrypt";

import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { decode } from "hono/jwt";
import prismaClient from "../prismaClient";
import usersService from "./credentials.service";
import CredentialsService from "./credentials.service";
import credentialsService from "./credentials.service";
import getReqBody from "../tools/getReqBody";

type ChangePasswordData = {
	oldPassword: string;
	newPassword: string;
	email: string;
};

class UsersMiddleware {
	async registration(c: Context, next: Next) {
		const data = (await getReqBody(c)) as {
			email: string;
			password: string;
			role: string;
		};

		const { email } = data;

		const user = await prismaClient.credentials.findFirst({
			where: { email: email },
		});
		if (user)
			throw new HTTPException(409, { message: `Email already exists` });

		await next();
	}

	async login(c: Context, next: Next) {
		const data = (await getReqBody(c)) as {
			email: string;
			password: string;
		};

		const { email, password } = data;

		const user = await prismaClient.credentials.findFirst({
			where: { email: email },
		});

		if (!user)
			throw new HTTPException(401, {
				message: "Incorrect email or password",
			});

		const isPasswordEquals = await bcrypt.compare(
			password as string,
			user.password,
		);

		if (!isPasswordEquals)
			throw new HTTPException(401, {
				message: "Incorrect email or password",
			});

		await next();
	}

	async active(c: Context, next: Next) {
		const { link } = c.req.param();

		const user = await prismaClient.credentials.findFirst({
			where: { activationLink: link },
		});

		if (!user)
			throw new HTTPException(400, {
				message: "Invalid activation link",
			});

		await next();
	}

	async changePassword(c: Context, next: Next) {
		const token = c.req.header("authorization");
		if (!token)
			throw new HTTPException(401, { message: "User not authorization" });

		const {
			payload: { email, newPassword, oldPassword },
		}: { payload: ChangePasswordData } = decode(token);

		const user = await usersService.findCredentials({ email });

		if (!user) throw new HTTPException(409, { message: "User not found" });

		const isPassword = await bcrypt.compare(oldPassword, user.password);

		if (!isPassword)
			throw new HTTPException(401, { message: "Incorrect password" });

		if (newPassword === oldPassword)
			throw new HTTPException(409, {
				message:
					"The new password must not be the same as the old password.",
			});

		await next();
	}

	async check(c: Context, next: Next) {
		const authorization = c.req.header("Authorization");

		const user = await CredentialsService.findCredentials({
			token: authorization,
		});
		if (!user) return;

		await next();
	}

	async change(c: Context, next: Next) {
		const authorization = c.req.header("authorization");

		if (!authorization)
			throw new HTTPException(401, { message: "Not authorization" });
		const user = await credentialsService.findCredentials({
			token: authorization,
		});

		if (user.role !== "admin") {
			throw new HTTPException(403, {
				message: "The client cannot change the data",
			});
		}
		await next();
	}
}

export default new UsersMiddleware();
