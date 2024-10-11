import { CartItemData } from "@/lib/redux/store/cart/cart";
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from ".";
import { CartType } from "@/types/cart";

export const appCartInitPost = async (userToken: string) => {
  const pathname = "cart/init";

  const cart = await appFetchPost<{ cart: CartType[] }>({
    pathname,
    authorization: userToken,
  });

  if (!cart) return;

  return cart.cart;
};

type AppCartPost = {
  product: CartItemData;
  userToken: string;
};
export const appCartPost = async ({ product, userToken }: AppCartPost) => {
  const pathname = "cart";

  const cart = await appFetchPost<CartType>({
    pathname,
    sendData: JSON.stringify(product),
    authorization: userToken,
  });

  return cart;
};

export const appCartPut = async (product: CartItemData, userToken?: string) => {
  const pathname = "cart";

  const cart = await appFetchPut<CartType>({
    pathname,
    authorization: userToken,
    putData: JSON.stringify(product),
  });

  return cart;
};

export const appCartDelete = async (id: number) => {
  const pathname = "cart";

  const result = await appFetchDelete({
    pathname,
    deleteData: JSON.stringify({ id }),
  });

  return result;
};
