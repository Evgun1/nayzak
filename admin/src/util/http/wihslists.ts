import { Wishlist } from "@/types/wishlist";
import { appFetchDelete, appFetchGet, appFetchPost } from ".";
import { WishlistItemData } from "@/lib/redux/store/wishlist/wishlist";

export const appWishlistsInitPost = async (customerID: number) => {
	const pathname = "wishlists/init";

	const wishlists = await appFetchPost<{ wishlists: Wishlist[] }>({
		pathname,
		sendData: JSON.stringify(customerID),
	});

	return wishlists?.wishlists;
};

export const appWishlistsPost = async (
	currentProduct: WishlistItemData,
	customerID: number,
) => {
	const pathname = "wishlists";

	const json = JSON.stringify({ currentProduct, customerID });

	const result = await appFetchPost<Wishlist>({ pathname, sendData: json });
	return result;
};

export const appWishlistsDelet = async (wishlistID: number) => {
	const pathname = "wishlists";

	const result = await appFetchDelete({
		pathname,
		deleteData: JSON.stringify({ id: wishlistID }),
	});

	console.log(result);
};
