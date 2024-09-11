import { CartItemData } from "@/lib/redux/store/cart/cart";
import { CartType } from "@/types/cart";
import useFetch from "./useFetch";

type SaveToCartProps = {
  product: CartItemData;
  userToken: string;
};

export async function useFetchCartSave({
  product,
  userToken,
}: SaveToCartProps) {
  const result = await useFetch<CartType>({
    url: `http://localhost:3030/cart`,
    method: "POST",
    contentType: "application/json",
    body: { json: { cartProduct: product, userToken } },
  });

  return result;
}
export async function useFetchCartUpdate({
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
export async function useFetchCartCheck(localToken: string) {
  const result = await useFetch<{ cart: CartType[] }>({
    url: "http://localhost:3030/cart",
    authorization: localToken,
    method: "GET",
  }).then((data) => data.cart);

  return result;
}
export async function useFethcDelete(id: number) {
  const removeProduct = await useFetch<string>({
    url: "http://localhost:3030/cart",
    method: "DELETE",
    contentType: "application/json",

    body: { json: { id: `${id}` } },
  });

  console.log(removeProduct);
}
