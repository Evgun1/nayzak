import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function ({
    auth,
    children,
}: {
    children: ReactNode;
    auth: ReactNode;
}) {
  

    return <div>{children}</div>;
}
