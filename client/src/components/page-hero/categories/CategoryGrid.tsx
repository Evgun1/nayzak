import classes from "./Categories.module.scss";
import { Category } from "../../../types/categories";
import Link from "next/link";
import { useFetchCategoriesall } from "@/hooks/useFetchCategories";

const CategoryGrid = async () => {
  const categoriesData = await useFetchCategoriesall();

  return (
    <ul className={`container ${classes.wrapper}`}>
      {categoriesData &&
        categoriesData.length > 0 &&
        categoriesData.map((category) => (
          <li key={category.id} className={classes["wrapper__block"]}>
            <Link
              className={` ${classes["wrapper__block-link"]} h7`}
              href={`/category/${category.title.toLowerCase()}`}
            >
              {category.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default CategoryGrid;
