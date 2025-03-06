import { Context } from 'hono';
import wishlistService from './wishlist.service';
import { WishlistInputDTO } from './interface/WishlistGetInput';
import getReqBody from '../tools/getReqBody';
import { QueryParameterTypes } from '../utils/service/service.type';

class WishlistController {
	async getAll(c: Context) {
		const queryParam = c.req.query() as QueryParameterTypes;

		const { wishlist, totalCount } = await wishlistService.getAll(queryParam);

		c.res.headers.append('X-Total-Count', totalCount.toString());
		return c.json(wishlist);
	}

	async initWishlists(c: Context) {
		const body = await getReqBody<{ customerId: number }>(c);

		if (!body) return;

		const wishlists = await wishlistService.initWishlists(body.customerId);

		return c.json(wishlists);
	}

	async saveWishlists(c: Context) {
		const inputData = await c.req.json<WishlistInputDTO>();

		const saveWishlists = await wishlistService.saveWishlist(inputData);

		return c.json(saveWishlists);
	}

	async removeWishlists(c: Context) {
		const body = (await getReqBody(c)) as { wishlistId: number };

		const id = await wishlistService.removeWishlist(body.wishlistId);

		return c.json(id);
	}
}

export default new WishlistController();
