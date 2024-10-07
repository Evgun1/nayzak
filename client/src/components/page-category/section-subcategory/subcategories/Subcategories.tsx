"use client";

import { FC, useEffect, useState } from "react";

import classes from "./Subcategories.module.scss";
import { LinkCustom } from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import { usePathname } from "next/navigation";
import { Subcategory } from "@/types/subcategories";
import { appSubcategoryByCategoryGet } from "@/utils/http/subcategories";

type SubcategoriesGridProps = {
  slug: string;
};

const SubcategoriesItem: FC<SubcategoriesGridProps> = ({ slug }) => {
  const pathname = usePathname();
  const [subcategories, setSubcategories] = useState<Subcategory[]>();


  useEffect(() => {
    (async () => {
      const subcategories = await appSubcategoryByCategoryGet(slug);
      setSubcategories(subcategories);
    })();
  }, [slug]);

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
