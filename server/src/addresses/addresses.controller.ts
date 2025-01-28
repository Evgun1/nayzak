import { Context } from 'hono';
import AddressesService from './addresses.service';
import { QueryParameterTypes } from '../utils/service/service.type';
import getReqBody from '../tools/getReqBody';
import addressesService from './addresses.service';
import { AddressInputDTO } from './addresses.types';

class AddressesController {
	async getAll(c: Context) {
		const queryParams = c.req.query() as QueryParameterTypes;

		const { addresses, addressesCount } =
			await AddressesService.getAll(queryParams);

		c.res.headers.append('X-Total-Count', addressesCount.toString());
		return c.json(addresses);
	}

	async create(c: Context) {
		const body = await getReqBody<AddressInputDTO>(c);

		if (!body) return;

		const address = await addressesService.create(body);

		return c.json(address);
	}

	async update(c: Context) {
		const body = await getReqBody<AddressInputDTO>(c);
		if (!body) return;

		const address = await addressesService.update(body);

		return c.json(address);
	}

	async delete(c: Context) {
		const body = await getReqBody<{ addressId: number | number[] }>(c);
		if (!body) return;

		const address = await addressesService.delete(body.addressId);

		return c.json(address);
	}
}

export default new AddressesController();
