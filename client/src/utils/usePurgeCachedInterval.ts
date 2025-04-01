"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const usePurgeCachedInterval = (sec: number) => {
    const route = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            route.prefetch("/");
        }, sec * 1000);

        return () => clearInterval(interval);
    }, [route, sec]);
};

export default usePurgeCachedInterval;
