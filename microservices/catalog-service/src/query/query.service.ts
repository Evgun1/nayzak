import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { ValidationQuery } from "./validation/validationQuery.dto";
import { QueryBuilder } from "./query.builder";
import { ModelArgsMap } from "src/prisma/interface/modelArgsMap.type";

// interface T {
// 	address: keyof typeof Prisma.AddressesScalarFieldEnum;
// }

@Injectable()
export class QueryService {
	getQuery<T extends keyof ModelArgsMap>(
		model: T,
		query: ValidationQuery,
	): ModelArgsMap[T] {
		const builder = QueryBuilder.create(model);
		builder.setQuery(query);
		const getBuilder = builder.getQuery();
		return getBuilder;
	}
}
