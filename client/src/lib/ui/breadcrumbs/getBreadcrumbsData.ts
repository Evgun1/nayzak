import { appCategoriesOneGet } from "@/utils/http/categories";
import { useParams } from "next/navigation";
import { BreadcrumbsPathItems } from "./Breadcrumbs";
import { appOneProductGet } from "@/utils/http/products";
import { appSubcategoriesOneGet } from "@/utils/http/subcategories";

export default async (
    accumulatedPath: string,
    pathname: string,
    slug: string | string[]
) => {
    const breadcrumbsPathArr: BreadcrumbsPathItems[] = [];
    let currentAccumulatedPath = accumulatedPath;
    const breadcrumbs = new Map<
        string,
        (data: string[]) => Promise<BreadcrumbsPathItems[]>
    >()
        .set("category", async (currentPathname: string[]) => {
            for (const element of currentPathname) {
                if (slug && slug.includes(element)) {
                    currentAccumulatedPath += `/${element.toLowerCase()}`;
                    breadcrumbsPathArr.push({
                        path: currentAccumulatedPath,
                        slug: element.replace(/\b\w/g, (char) =>
                            char.toUpperCase()
                        ),
                    });
                }
            }
            breadcrumbsPathArr.unshift({ path: "/", slug: "Home" });

            return breadcrumbsPathArr;
        })
        .set("product", async (currentPathname: string[]) => {
            if (!Array.isArray(slug)) {
                const product = await appOneProductGet(
                    slug.replaceAll("_", " ")
                );
                const categoryTitle = (
                    await appCategoriesOneGet(product.categoriesId)
                ).title.toLowerCase();
                const subcategoryTitle = (
                    await appSubcategoriesOneGet(product.subcategoriesId)
                ).title.toLowerCase();

                const data = {
                    categoryTitle,
                    subcategoryTitle,
                    productTitle: product.title,
                } as {
                    [key: string]: string;
                };

                for (const key in data) {
                    currentAccumulatedPath += `/${data[key]}`;

                    breadcrumbsPathArr.push({
                        path: currentAccumulatedPath,
                        slug: data[key],
                    });
                }
                breadcrumbsPathArr.unshift({ path: "/", slug: "Home" });

                return breadcrumbsPathArr;
            }
            return breadcrumbsPathArr;
        });

    const currentPathname = pathname.replaceAll("/", " ").trim().split(" ");

    for (const [key, value] of breadcrumbs.entries()) {
        if (currentPathname.includes(key)) {
            return await value(currentPathname);
        }
    }
};
