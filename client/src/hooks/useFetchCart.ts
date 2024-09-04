import { CartItemData } from "@/lib/redux/store/cart/cart";
import { CartType } from "@/types/cart";
import useFetch from "./useFetch";
import { Token } from "./useToken";

type SaveToCartProps = {
  product: CartItemData;
  userToken: string;
};

export namespace Cart {
  export async function useFetchSave({ product, userToken }: SaveToCartProps) {
    const result = await useFetch<CartType>({
      url: `http://localhost:3030/cart`,
      method: "POST",
      contentType: "application/json",
      body: { json: { cartProduct: product, userToken } },
    });

    return result;
  }
  export async function useFetchUpdate({
    product,
    userToken,
  }: SaveToCartProps) {
    const result = await useFetch<CartType>({
      url: `http://localhost:3030/cart`,
      method: "PUT",
      contentType: "application/json",
      body: { json: { cartProduct: product, userToken } },
    });

    return result;
  }

  export async function useFetchCheck() {
    const localToken = await Token.useGet();

    if (!localToken) return;

    const result = await useFetch<{ cart: CartType[] }>({
      url: "http://localhost:3030/cart",
      authorization: localToken,
      method: "GET",
    }).then((data) => data.cart);

    return result;
  }
}
