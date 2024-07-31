import Link from "next/link";
import { FC } from "react";

type LinkItemProps = {
  linkName: string;
  urlQueryName: string;
  deleteUrlQueryName?: string;
  urlSearchParams: URLSearchParams;
};
const LinkItem: FC<LinkItemProps> = ({
  linkName,
  urlQueryName,
  deleteUrlQueryName,
  urlSearchParams,
}) => {
  urlSearchParams.set(urlQueryName, linkName.toLowerCase());
  const href = `?${urlSearchParams}`;
  if (deleteUrlQueryName) {
    urlSearchParams.delete(deleteUrlQueryName);
  }

  return (
    <Link scroll={false} href={href}>
      {linkName}
    </Link>
  );
};

export default LinkItem;
