import { HTTPException } from "hono/http-exception";
import prismaClient from "../prismaClient";
import usersService from "../users/users.service";
import WishlistsGTO, {
  WihslistsDataGTO,
  WishlistInputDTO,
} from "./interface/WishlistGetIntut";

export async function initWishlists(userToken: string) {
  const userID = (await usersService.findUserByToken(userToken)).id;
  const wishlists = await prismaClient.wishlist.findMany({
    where: { user_id: userID },
  });

  if (!wishlists) return;
  const wishlistGTOArr: WihslistsDataGTO[] = [];

  wishlists.map(({ id, product_id }) => {
    wishlistGTOArr.push({ id: id, productID: product_id });
  });

  return wishlistGTOArr;
}
export async function saveWishlist({
  currentProduct: { productID },
  userToken,
}: WishlistInputDTO) {
  const userID = (await usersService.findUserByToken(userToken)).id;

  const saveWishlist = await prismaClient.wishlist.create({
    data: { product_id: productID, user_id: userID },
  });

  const wishlistGTO = new WishlistsGTO({
    id: saveWishlist.id,
    productID: saveWishlist.product_id,
  });

  return wishlistGTO;
}
export async function removeWishlist(id: number) {
  await prismaClient.wishlist.delete({ where: { id: id } });
}

export default {
  initWishlists: initWishlists,
  saveWishlist,
  deleteWishlist: removeWishlist,
};
