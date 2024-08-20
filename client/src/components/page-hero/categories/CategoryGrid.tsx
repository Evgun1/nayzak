import classes from "./Categories.module.scss";
import { Category } from "../../../types/categories";
import Link from "next/link";

const CategoryGrid = async () => {
  const res = await fetch("http://localhost:3030/categories", {
    cache: "no-cache",
  });
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }
  const result: { categories: Category[] } = await res.json();
  const categoriesData = result.categories;

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
