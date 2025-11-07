import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class CreateUsersService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly users: {
		email: string;
		role: string;
		password: string;
		firstName: string;
		lastName: string;
	}[] = [
		{
			email: "admin@gmail.com",
			role: "admin",
			password: "admin",
			firstName: "admin",
			lastName: "admin",
		},
	];

	async createUsers() {
		const arrCredential: Prisma.CredentialsCreateInput[] = [];

		for (const element of this.users) {
			const credential = await this.prisma.credentials.findUnique({
				where: { email: element.email },
			});
			if (credential) continue;

			const saltRounds = Math.floor(Math.random() * (10 - 1) + 1);
			const hashPassword = await bcrypt.hash(
				element.password,
				saltRounds,
			);

			await this.prisma.credentials.create({
				data: {
					email: element.email,
					password: hashPassword,
					role: element.role as Role,
					Customers: {
						create: {
							firstName: element.firstName,
							lastName: element.lastName,
						},
					},
				},
			});
		}
	}
}
