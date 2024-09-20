import { CartItemData } from "@/lib/redux/store/cart/cart";
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from ".";
import { CartType } from "@/types/cart";

export const appCartCheckGet = async (userToken: string) => {
  const pathname = "cart";

  const { cart } = await appFetchGet<{ cart: CartType[] }>({
    pathname,
    authorization: userToken,
  });

  return cart;
};

export const appCartPost = async (product: CartItemData, userToken: string) => {
  const pathname = "cart";

  const json = { product, userToken };
  const cart = await appFetchPost<CartType>({ pathname, sendData: { json } });

  return cart;
};

export const appCartPut = async (product: CartItemData, userToken: string) => {
  const pathname = "cart";

  const json = { product, userToken };
  const cart = await appFetchPut<CartType>({
    pathname,
    putData: { json },
  });

  return cart;
};

export const appCartDelete = async (id: number) => {
  const pathname = "cart";

  const result = await appFetchDelete({ pathname, deleteData: { id } });
};
