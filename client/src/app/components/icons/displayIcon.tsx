import { FC } from "react";
import IconsIdList from "./IconsIdList";

import "./style.scss";

type DisplayIconProps = {
  iconName: IconsIdList;
  width?: string;
  height?: string;
  color?: string;
  className?: string;
};

const DisplayIcon: FC<DisplayIconProps> = ({
  iconName,
  height,
  width,
  color,
  className,
}) => {
  return (
    <svg
      className={className}
      width={width ? width : "24"}
      height={height ? height : "24"}
      // style={color ? { color: `${color}` } : { color: "var(--black-900)" }}
    >
      <use
        width={width ? width : "24"}
        height={height ? height : "24"}
        xlinkHref={`#${iconName}`}
      />
    </svg>
  );
};

export default DisplayIcon;
