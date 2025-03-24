"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { initAddress } from "@/lib/redux/store/address/action";
import { initAuth } from "@/lib/redux/store/auth/action";
import { initCart } from "@/lib/redux/store/cart/action";
import { initCustomer } from "@/lib/redux/store/customer/action";
import { initOrders } from "@/lib/redux/store/orders/action";
import { initWishlist } from "@/lib/redux/store/wishlist/action";
import { appCookieGet } from "@/utils/http/cookie";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    useLayoutEffect,
} from "react";

interface GlobalContextType {}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const customer = useAppSelector((state) => state.customer.customerData);

    useEffect(() => {
        (async () => {
            const token = appCookieGet("user-token");

            if (token) {
                dispatch(initAuth());
                dispatch(initCustomer());
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        if (customer) {
            // dispatch(initAddress());
            // dispatch(initWishlist());
            // dispatch(initCart());
            // dispatch(initOrders());
        }
    }, [dispatch, customer]);
    return (
        <GlobalContext.Provider value={{ data, setData }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalProvider"
        );
    }
    return context;
};
