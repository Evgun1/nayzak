import { number } from 'zod';
import { Prisma } from '@prisma/client';
import {
	FilterType,
	LimitType,
	OffsetType,
	QueryParameterTypes,
	SortTypes,
} from '../service/service.type';

class QueryParamHandler {
	filter<T>(inputData: QueryParameterTypes, validData: Record<string, string>) {
		const where: Partial<T> & { OR?: Array<Record<string, any>> } = {};

		if (inputData.search) {
			if (Object.keys(validData).includes('title'))
				where.OR = [
					{
						title: {
							contains: inputData.search.toString(),
							mode: 'insensitive',
						},
					},
				];

			if (Object.keys(validData).includes('name'))
				where.OR = [
					{
						name: {
							contains: inputData.search.search.toString(),
							mode: 'insensitive',
						},
					},
				];
		}

		for (const key in inputData) {
			if (!Object.keys(validData).includes(key)) continue;
			if (inputData[key] === 'undefined' || !inputData[key]) continue;

			const number = inputData[key].split(',').map((data) => +data);

			const isAllNumbers = number.every((data) => !isNaN(Number(data)));

			if (isAllNumbers) {
				where[key as keyof T] = {
					in: number,
				} as any;
				continue;
			}

			where[key as keyof T] = inputData[key] as any;
		}

		return where as T;
	}

	orderBy<T>(queryParams: SortTypes, validKey: Record<string, string>) {
		const { sortBy, sort } = queryParams;
		const orderBy = {} as T;

		if (sortBy && sort)
			if (Object.keys(validKey).includes(sortBy))
				orderBy[sortBy as keyof T] = sort.toString() as any;

		return orderBy;
	}

	limit(productGetDTO: LimitType) {
		const limit = productGetDTO.limit;

		if (limit) {
			return parseInt(limit);
		}

		return undefined;
	}

	offset(productGetDTO: OffsetType) {
		const offset = productGetDTO.offset ?? '0';

		return parseInt(offset);
	}
}

export default new QueryParamHandler();
export { QueryParamHandler };
