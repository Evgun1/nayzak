import { FC } from "react";
import IconsIdList from "./IconsIdList";

import "./style.scss";

type DisplayIconProps = {
  iconName: IconsIdList;
  className?: string;
};

const DisplayIcon: FC<DisplayIconProps> = ({ iconName, className }) => {
  return (
    <svg
      className={className}
      // width={width ? width : "24"}
      // height={height ? height : "24"}
      // style={color ? { color: `${color}` } : { color: "var(--black-900)" }}
    >
      <use width={"100%"} height={"100%"} xlinkHref={`#${iconName}`} />
    </svg>
  );
};

export default DisplayIcon;
