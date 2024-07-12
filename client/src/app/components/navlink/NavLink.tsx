import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

type NavLinkProps = {
  title: string;
  urlSearchParams: URLSearchParams;
  nameQueryParams: string;
};

export default function NavLink({
  title,
  urlSearchParams,
  nameQueryParams,
}: NavLinkProps) {
  urlSearchParams.set(nameQueryParams, title.toLowerCase());
  const href = `?${urlSearchParams}`;

  return (
    <Link scroll={false} href={href}>
      {title}
    </Link>
  );
}
