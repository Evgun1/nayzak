"use client";

import { FC, useEffect, useState } from "react";

import classes from "./Subcategories.module.scss";
import LinkCustom from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import { usePathname } from "next/navigation";
import { Subcategory } from "@/types/subcategories";
import { Subcategories } from "@/hooks/useFetchSubcategories";

type SubcategoriesGridProps = {
  slug: string;
};

const SubcategoriesItem: FC<SubcategoriesGridProps> = ({ slug }) => {
  const pathname = usePathname();
  const [subcategories, setSubcategories] = useState<Subcategory[]>();

  const setData = async () => {
    const subcategories = await Subcategories.useFetchByCategory(slug);

    setSubcategories(subcategories);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className={`container ${classes.subcategories}`}>
      {subcategories &&
        subcategories.length > 0 &&
        subcategories.map(({ title }, index) => (
          <div key={index} className={classes["subcategories--item"]}>
            <LinkCustom.SiteLink
              styleSettings={{
                color: { dark: true },
                roundess: LinkCustom.Roundness.rounded,
                size: LinkCustom.Size.M,
                type: LinkCustom.Type.default,
              }}
              href={{
                endpoint: `${pathname}/${title.toLowerCase()}`,
              }}
              className={classes["subcategories--item-btn"]}
            >
              {title}
            </LinkCustom.SiteLink>
          </div>
        ))}
    </div>
  );
};

export default SubcategoriesItem;
