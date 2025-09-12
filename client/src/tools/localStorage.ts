import { AddressState } from "@/redux/store/address/address";
import { CartState } from "@/redux/store/cart/cart";
import { CustomerState } from "@/redux/store/customer/customer";
import { OrderState } from "@/redux/store/orders/orders";
import { WishlistState } from "@/redux/store/wishlist/wishlist";

const keyLocalStorage = [
	"customerState",
	"wishlistState",
	"addressState",
	"cartState",
	"ordersState",
];

type LocalStorageMap = {
	customerState: CustomerState;
	wishlistState: WishlistState;
	addressState: AddressState;
	cartState: CartState;
	ordersState: OrderState;
	all: keyof Omit<LocalStorageMap, "all">;
};

const localStorageHandler = <T extends keyof LocalStorageMap>(key: T) => {
	const isBrowser = typeof window !== "undefined";

	const get = (): LocalStorageMap[T] | null => {
		if (!isBrowser) return null;
		if (!key) return null;

		const data = localStorage.getItem(key);
		if (data) {
			try {
				return JSON.parse(data) as LocalStorageMap[T];
			} catch {
				return null;
			}
		}
		return null;
	};

	const set = (data: LocalStorageMap[T]) => {
		if (!isBrowser) return;

		return localStorage.setItem(key, JSON.stringify(data));
	};

	const del = (keyArr?: Array<LocalStorageMap[T]>) => {
		if (!isBrowser) return;

		if (keyArr) {
			for (const element of keyArr) {
				localStorage.removeItem(element.toString());
			}
			return;
		} else {
			return localStorage.removeItem(key);
		}
	};

	const clear = () => {
		return localStorage.clear();
	};

	return {
		set: set,
		get: get,
		delete: del,
		clear,
	};
};

export default localStorageHandler;
