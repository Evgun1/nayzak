import { FC, ReactNode } from "react";

import classes from "./Title.module.scss";

const Title: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={classes["title"]}>{children}</div>;
};
export default Title;
