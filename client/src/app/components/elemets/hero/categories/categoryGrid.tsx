import classes from "./categories.module.scss";
import { CategoriesType } from "../../../types/categories";
import Link from "next/link";

const CategoryGrid = async () => {
  const res = await fetch("http://localhost:3030/categories", {
    cache: "no-cache",
  });
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }
  const result: { categories: CategoriesType[] } = await res.json();
  const categoriesData = result.categories;

  // console.log(categoriesData);

  return (
    <ul className={`container ${classes.wrapper}`}>
      {categoriesData &&
        categoriesData.length > 0 &&
        categoriesData.map((value) => (
          <li key={value.id} className={classes["wrapper__block"]}>
            <Link
              className={` ${classes["wrapper__block-link"]} h7`}
              href={"/"}
            >
              {value.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default CategoryGrid;
