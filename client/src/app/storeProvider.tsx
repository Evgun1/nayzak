"use client";

import store from "@/lib/redux/store";
import usePurgeCachedInterval from "@/utils/usePurgeCachedInterval";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
    usePurgeCachedInterval(1800);
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
