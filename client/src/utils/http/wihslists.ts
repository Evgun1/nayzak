import { Wishlist } from "@/types/wishlist";
import { appFetchDelete, appFetchGet, appFetchPost } from ".";
import { WishlistItemData } from "@/lib/redux/store/wishlist/wishlist";

export const appWishlistsInitGet = async (userToken: string) => {
  const pathname = "wishlists/init";

  const { wishlists } = await appFetchGet<{ wishlists: Wishlist[] }>({
    pathname,
    authorization: userToken,
  });
  return wishlists;
};

export const appWishlistsPost = async (
  currentProduct: WishlistItemData,
  userToken: string
) => {
  const pathname = "wishlists";

  const json = { currentProduct, userToken };

  const result = await appFetchPost<Wishlist>({ pathname, sendData: { json } });
  return result;
};

export const appWishlistsDelet = async (wishlistID: number) => {
  const pathname = "wishlists";

  const result = await appFetchDelete({
    pathname,
    deleteData: { id: wishlistID },
  });

  console.log(result);
};
