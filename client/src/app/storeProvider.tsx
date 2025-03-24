"use client";

import InitData from "@/components/elements/initData";
import { useAppDispatch } from "@/lib/redux/redux";
import store from "@/lib/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
