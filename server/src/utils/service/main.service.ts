import { Prisma } from '@prisma/client';
import prismaClient from '../../prismaClient';
import { QueryParameterTypes } from './service.type';
import { log } from 'console';

class MainService {
	private supportedMapTypes: Map<string, (key: any, id: any) => Promise<any>> =
		new Map();

	constructor() {
		this.setupMapTypes();
	}

	private setupMapTypes(): void {
		this.supportedMapTypes
			.set('Number', async (key: string, id: number) => {
				const sql: { id: number }[] = await prismaClient.$queryRawUnsafe(
					`SELECT * from "${key}" WHERE id=${id}`
				);

				await prismaClient.$queryRawUnsafe(
					`DELETE from "${key}" WHERE id=${id}`
				);

				return sql.pop();
			})
			.set('Array', async (key: string, id: number[]) => {
				const query = `SELECT * from "${key}" WHERE id IN (${
					Prisma.join(id).values
				})`;
				const sql: { id: number }[] = await prismaClient.$queryRawUnsafe(query);
				await prismaClient.$queryRawUnsafe(
					`DELETE from "${key}" WHERE id IN (${Prisma.join(id).values})`
				);
				return sql;
			});
	}

	async delete<T>(keyTables: Prisma.ModelName, id: number | number[]) {
		for (const [key, value] of this.supportedMapTypes) {
			if (id.constructor.name.includes(key)) {
				return (await value(keyTables, id)) as T;
			}
		}
	}
}

export default new MainService();
export { MainService };
