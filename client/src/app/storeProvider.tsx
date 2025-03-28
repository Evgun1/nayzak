"use client";

import store from "@/lib/redux/store";
import purgeCachedInterval from "@/utils/purgeCachedInterval";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
    purgeCachedInterval(1800);

    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
