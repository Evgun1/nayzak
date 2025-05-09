import { WishlistItem } from "@/types/wishlist";
import { appFetchDelete, appFetchGet, appFetchPost } from ".";
import { WishlistItemData } from "@/lib/redux/store/wishlist/wishlist";

const tag = "wishlists";

export const appWishlistsInitPost = async (customerID: number) => {
    const pathname = "wishlists/init";

    const { response, totalCount } = await appFetchPost<WishlistItem[]>({
        tag,
        pathname,
        sendData: { customerID },
    });

    return response;
};

export const appWishlistsPost = async (
    currentProduct: WishlistItemData,
    customerID: number
) => {
    const pathname = "wishlists";

    const data = { currentProduct, customerID };

    const { response } = await appFetchPost<WishlistItem>({
        tag,
        pathname,
        sendData: data,
    });
    return response;
};

export const appWishlistsDelete = async (wishlistId: number) => {
    const pathname = "wishlists";

    const result = await appFetchDelete({
        tag,
        pathname,
        deleteData: { wishlistId },
    });
    return result;
};
