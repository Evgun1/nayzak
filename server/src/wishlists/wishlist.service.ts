import prismaClient from '../prismaClient';
import WishlistsGTO, {
	WishlistsDataGTO as WishlistsDataGTO,
	WishlistInputDTO,
} from './interface/WishlistGetInput';
import { MainService } from '../utils/service/main.service';
import { QueryParameterTypes } from '../utils/service/service.type';
import { Prisma } from '@prisma/client';
import { QueryParamHandler } from '../utils/query-params/QueryParams.service';

class WishlistService {
	private mainService = new MainService();
	private queryParams = new QueryParamHandler();

	async getAll(queryParams: QueryParameterTypes) {
		const where = this.queryParams.filter<Prisma.WishlistWhereInput>(
			queryParams,
			Prisma.WishlistScalarFieldEnum
		);
		const orderBy =
			this.queryParams.orderBy<Prisma.WishlistOrderByWithRelationInput>(
				queryParams,
				Prisma.WishlistScalarFieldEnum
			);
		const skip = this.queryParams.offset(queryParams);
		const take = this.queryParams.limit(queryParams);

		const options: Prisma.WishlistFindManyArgs = {
			where,
			orderBy,
			skip,
			take,
		};

		const wishlist = await prismaClient.wishlist.findMany(options);
		const totalCount = await prismaClient.wishlist.count({
			where: options.where,
		});

		return { wishlist, totalCount };
	}

	async initWishlists(customerId: number) {
		const wishlists = await prismaClient.wishlist.findMany({
			where: { customersId: customerId },
		});

		if (!wishlists) return;
		const wishlistGTOArr: WishlistsDataGTO[] = [];

		wishlists.map(({ id, productsId }) => {
			wishlistGTOArr.push({ id: id, productID: productsId });
		});

		return wishlistGTOArr;
	}

	async saveWishlist({
		currentProduct: { productID },
		customerID,
	}: WishlistInputDTO) {
		const saveWishlist = await prismaClient.wishlist.create({
			data: { productsId: productID, customersId: customerID },
		});

		const wishlistGTO = new WishlistsGTO({
			id: saveWishlist.id,
			productID: saveWishlist.productsId,
		});

		return wishlistGTO;
	}

	async removeWishlist(id: number | number[]) {
		return this.mainService.delete('Wishlist', id);
	}
}

export default new WishlistService();
