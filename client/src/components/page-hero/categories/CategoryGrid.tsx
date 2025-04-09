import classes from "./Categories.module.scss";
import Link from "next/link";
import { appCategoriesGet } from "@/utils/http/categories";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import Image from "next/image";

const CategoryGrid = async () => {
    const categoriesData = await appCategoriesGet();

    // const t = new URL(window.history)

    return (
        <section className='section'>
            <div className='container'>
                <ul className={classes["categories-grid"]}>
                    {categoriesData &&
                        categoriesData.length > 0 &&
                        categoriesData.map((category, i) => (
                            <li key={i}>
                                <div
                                    className={
                                        classes["categories-grid__content"]
                                    }
                                >
                                    <Image
                                        loading='lazy'
                                        fill
                                        sizes='width:100%; height:100%;'
                                        className={
                                            classes["categories-grid__image"]
                                        }
                                        src='https://placehold.co/400'
                                        alt={category.title}
                                    />

                                    <LinkCustom
                                        className={
                                            classes["categories-grid__link"]
                                        }
                                        href={{
                                            endpoint: `/category/${category.title.toLowerCase()}`,
                                        }}
                                        styleSettings={{
                                            color: "LIGHT",
                                            fill: "SOLID",
                                            roundness: "ROUNDED",
                                            size: "MEDIUM",
                                            type: "DEFAULT",
                                        }}
                                    >
                                        {category.title}
                                    </LinkCustom>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
};

export default CategoryGrid;
