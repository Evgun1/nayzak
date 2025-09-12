"use client";

import store from "@/redux/store";
import PurgeCachedInterval from "@/tools/purgeCachedInterval";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
	PurgeCachedInterval(1800);
	return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
