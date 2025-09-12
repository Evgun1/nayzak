import { WishlistItem } from "@/types/wishlist";
import { appFetchDelete, appFetchGet, appFetchPost } from ".";
import { WishlistItemData } from "@/redux/store/wishlist/wishlist";

const tag = "wishlists";

export const appWishlistsInitGet = async (token: string) => {
	const pathname = "wishlists/init";
	const nginxPathname = "user/wishlist/init";

	const { result, totalCount } = await appFetchGet<WishlistItem[]>({
		pathname: nginxPathname,
		authorization: token,
		cache: { request: "no-cache" },
	});

	return result;
};

export const appWishlistsPost = async (
	wishlist: WishlistItemData,
	token: string,
) => {
	const pathname = "wishlists";
	const nginxPathname = "user/wishlist";

	try {
		const { result } = await appFetchPost<WishlistItem>({
			authorization: token,
			pathname: nginxPathname,
			sendData: wishlist,
		});
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const appWishlistsDelete = async (wishlistId: number, token: string) => {
	const pathname = "wishlists";
	const nginxPathname = "user/wishlist";

	const result = await appFetchDelete({
		authorization: token,
		pathname: nginxPathname,
		deleteData: { id: wishlistId },
	});
	return result;
};
