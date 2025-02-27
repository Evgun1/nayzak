import { randomUUID } from 'crypto';
import prismaClient from '../prismaClient';
import bcrypt, { genSaltSync } from 'bcrypt';
import { UserDto } from './credentials.dto';
import mailService from '../mail/mail.service';
import { HTTPException } from 'hono/http-exception';
import { decode, sign } from 'hono/jwt';
import { CredentialsChangeGetDTO, UserGetDTO } from './interface/UserGetInput';
import { Prisma } from '@prisma/client';
import customersService from '../customers/customers.service';
import { MainService } from '../utils/service/main.service';
import { QueryParameterTypes } from '../utils/service/service.type';
import { QueryParamHandler } from '../utils/query-params/QueryParams.service';

type FindUserData = {
	token?: string;
	email?: string;
};

class CredentialsOption {
	whereEmail({ email }: { email: string }) {
		const where: Prisma.CredentialsWhereInput = {};

		if (email) {
			where.email = email;
		}

		return where;
	}

	whereCredentialsOne(id: number) {
		const where: Prisma.CredentialsWhereUniqueInput = { id };
		return where;
	}

	whereCredentialsMany(ids: number[]) {
		const where: Prisma.CredentialsWhereInput = {};
		where.id = { in: ids };
		return where;
	}
}

class CredentialsService {
	private credentialsOption = new CredentialsOption();
	private mainService = new MainService();
	private queryParams = new QueryParamHandler();

	async getAll(inputData: QueryParameterTypes) {
		const skip = this.queryParams.offset({ offset: inputData.offset });
		const take = this.queryParams.limit({ limit: inputData.limit });
		const orderBy =
			this.queryParams.orderBy<Prisma.CredentialsOrderByWithRelationInput>(
				inputData,
				Prisma.CredentialsScalarFieldEnum
			);

		const option: Prisma.CredentialsFindManyArgs = {
			take,
			skip,
			orderBy,
		};

		const credentials = await prismaClient.credentials.findMany(option);
		const count = await prismaClient.credentials.count();

		return { credentials, count };
	}

	async getOne(credentialsId: number) {
		return prismaClient.credentials.findFirst({
			where: { id: credentialsId },
		});
	}

	async registration(data: UserGetDTO) {
		const { email, role, password, isActive } = data;

		console.log(data);
		const activationLink = randomUUID();

		const hashPassword = await bcrypt.hash(password, genSaltSync());

		const createUser = await prismaClient.credentials.create({
			data: {
				email: email.trim(),
				password: hashPassword,
				activationLink: isActive ? '' : activationLink,
				isActive: isActive === 'true',
				role: role,
				createdAt: new Date().toISOString(),
			},
		});

		await customersService.create({
			credentialsId: createUser.id.toString(),
			firstName: '',
			lastName: '',
			phone: 0,
		});

		await mailService.sendActivateMail(
			email,
			`${process.env.API_URL}user/active/${activationLink}`
		);

		const credentialsDto = new UserDto({
			id: createUser.id,
			email: createUser.email,
			role: createUser.role,
			isActivated: createUser.isActive,
		});

		return await sign(credentialsDto, process.env['JWT_SECRET_KEY'] as string);
	}

	async login(data: UserGetDTO) {
		const { email } = data;

		console.log(email);

		// const {
		//   payload: { email, password },
		// }: { payload: { email: string; password: string } } = decode(userToken);

		const where = this.credentialsOption.whereEmail({ email });
		const queryOptions: Prisma.CredentialsFindFirstArgs = {
			where,
		};

		const user = await prismaClient.credentials.findFirst(queryOptions);

		if (!user) {
			return;
		}

		const userDto = new UserDto({
			id: user.id,
			email: user.email,
			role: user.role,
			isActivated: user.isActive,
		});

		return await sign(userDto, process.env.JWT_SECRET_KEY as string);
	}

	async changePassword(userToken: string) {
		const {
			payload: { email, newPassword },
		}: { payload: { newPassword: string; email: string } } = decode(userToken);

		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(newPassword, salt);

		const userID = (await this.findCredentials({ email })).id;

		return prismaClient.credentials.update({
			where: { id: userID },
			data: { password: hashPassword },
		});
	}

	async activate(activationLink: string) {
		const user = await prismaClient.credentials.findFirst({
			where: { activationLink },
		});

		if (!user) {
			return;
			// throw new HTTPException(400, { message: "Invalid activation link" });
		}

		await prismaClient.credentials.update({
			where: { id: user.id },
			data: { isActive: true },
		});
	}

	async init(token: string) {
		const user = await this.findCredentials({ token });

		if (!user) {
			return;
		}

		const userData = new UserDto({
			id: user.id,
			email: user.email,
			role: user.role,
			isActivated: user.isActive,
		});

		return await sign(userData, process.env.JWT_SECRET_KEY as string);
	}

	async change(data: CredentialsChangeGetDTO, id: string) {
		const isActive = data.isActive === 'true';

		return prismaClient.credentials.update({
			where: { id: parseInt(id.toString()) },
			data: {
				email: data.email,
				isActive,
				role: data.role,
				updatedAt: new Date(),
			},
		});
	}

	async delete(credentialId: number | number[]) {
		return this.mainService.delete('Credentials', credentialId);
	}

	async findCredentials({ email, token }: FindUserData) {
		let userData: { email: string } | null;

		if (token) {
			const decodeToken: { header: any; payload: UserDto } = decode(token);
			userData = decodeToken.payload;
		} else {
			userData = { email: email as string };
		}

		const user = await prismaClient.credentials.findFirst({
			where: { email: userData?.email },
		});

		if (!user) throw new HTTPException(401, { message: 'Not authorized' });
		return user;
	}
}

export default new CredentialsService();
