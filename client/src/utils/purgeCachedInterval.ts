"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const purgeCachedInterval = (sec: number) => {
    const route = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            revalidatePath("/");
        }, sec * 1000);

        return () => clearInterval(interval);
    }, [route]);
};

export default purgeCachedInterval;
