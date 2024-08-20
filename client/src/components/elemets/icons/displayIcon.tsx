import { FC } from "react";
import IconsIdList from "./IconsIdList";

import "./style.scss";

type DisplayIconProps = {
  iconName: IconsIdList;
  className?: string;
};

const DisplayIcon = ({ iconName, className }: DisplayIconProps) => {
  return (
    <svg className={className}>
      <use width={"100%"} height={"100%"} xlinkHref={`#${iconName}`} />
    </svg>
  );
};

export default DisplayIcon;
