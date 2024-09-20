"use client";

import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { FC, ReactNode } from "react";
import classes from "./productList.module.scss";

type LoaderProps = {
  children: ReactNode;
  totalCount: number;
  count: number;
  style: any;
  btnClickHandler: () => void;
};

const Loader: FC<LoaderProps> = ({
  count,
  totalCount,
  children,
  btnClickHandler,
  style,
}) => {
  if (!children) return;

  return (
    <div>
      <ul className={`${style} ${classes.grid}`}>{children}</ul>
      {totalCount > count && (
        <ButtonCustom.SiteButton
          onClick={btnClickHandler}
          styleSettings={{
            size: ButtonCustom.Size.M,
            type: ButtonCustom.Type.default,
            color: { light: true },
            roundess: ButtonCustom.Roundness.sharp,
          }}
        >
          Loard More
        </ButtonCustom.SiteButton>
      )}
    </div>
  );
};

export default Loader;
