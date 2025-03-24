import { CartItemData } from "@/lib/redux/store/cart/cart";
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from ".";
import { CartItem } from "@/types/cart.types";
import { appCookieGet } from "./cookie";

export const appCartInitPost = async (customerID: number) => {
    const pathname = "cart/init";

    const token = appCookieGet("user-token");

    const { response } = await appFetchPost<CartItem[]>({
        pathname,
        sendData: { customerID },
    });

    if (!response) return;

    return response;
};

type AppCartPost = {
    product: CartItemData;
    customerID: number;
};
export const appCartPost = async ({ product, customerID }: AppCartPost) => {
    const pathname = "cart";

    const { productID, amount } = product;

    const { response } = await appFetchPost<CartItem>({
        pathname,
        sendData: { productID, amount, customerID },
    });

    return response;
};

export const appCartPut = async (product: CartItemData, customerID: number) => {
    const pathname = "cart";

    const { amount, productID, id } = product;

    const { response } = await appFetchPut<CartItem>({
        pathname,
        putData: { id, amount, productID, customerID },
    });

    return response;
};

export const appCartDelete = async (id: number | number[]) => {
    const pathname = "cart";

    const result = await appFetchDelete({
        pathname,
        deleteData: { id: id },
    });

    return result;
};
