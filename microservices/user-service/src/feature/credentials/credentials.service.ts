import { $Enums } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { QueryDTO } from "src/query/dto/query.dto";
import { QueryModule } from "src/query/query.module";
import { QueryService } from "src/query/query.service";
import { take } from "rxjs";

@Injectable()
export class CredentialsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly queryService: QueryService,
	) {}

	async getAll(query: QueryDTO) {
		const { orderBy, skip, take, where } = this.queryService.getQuery(
			"Credentials",
			query,
		);

		const credentials = await this.prisma.credentials.findMany({
			orderBy,
			skip,
			take,
			where,
		});
		const totalCount = await this.prisma.credentials.count({
			where,
		});

		return { credentials, totalCount };
	}

	async getOne(params: number) {
		return await this.prisma.credentials.findFirst({
			where: { id: params },
		});
	}
}
