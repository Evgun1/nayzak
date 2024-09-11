import { Wishlist } from "@/types/wishlist";
import useFetch from "./useFetch";
import { WishlistItemData } from "@/lib/redux/store/wishlist/wishlist";

export async function useFetchWishlistInit(userToken: string) {
  const result = await useFetch<{ wishlist: Wishlist[] }>({
    url: "http://localhost:3030/wishlists/init",
    authorization: userToken,
  }).then((data) => data.wishlist);

  return result;
}

export async function useFetchWishlistSave(
  currentProduct: WishlistItemData,
  userToken: string
) {
  const result = await useFetch<Wishlist>({
    url: "http://localhost:3030/wishlists",
    method: "POST",
    contentType: "application/json",
    body: { json: { currentProduct, userToken } },
  });

  return result;
}

export async function useFetchWishlistRemove(wishlistID: number) {
  const result = await useFetch<Wishlist>({
    url: "http://localhost:3030/wishlists",
    method: "DELETE",
    contentType: "application/json",
    body: { json: { id: wishlistID } },
  });

  console.log(result);
}
