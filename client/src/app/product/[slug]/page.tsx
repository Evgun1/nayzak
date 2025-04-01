"use server";
import "./style.scss";
import { appOneProductGet } from "@/utils/http/products";
import { appReviewsProductGet } from "@/utils/http/reviews";
import { appCustomersGet } from "@/utils/http/customer";
import { ReviewItem } from "@/types/reviews.types";
import Product from "@/components/page-product/Product";
import { appCategoriesOneGet } from "@/utils/http/categories";
import { appSubcategoriesOneGet } from "@/utils/http/subcategories";
import ClientComponent from "@/components/ClientComponent";

export default async function Page(props: { params: { slug: string } }) {
    const urlSearchParams = new URLSearchParams();
    // const product = await appOneProductGet(props.params.slug);

    const productData = async () => {
        const product = await appOneProductGet(props.params.slug);
        const category = await appCategoriesOneGet(product.categoriesId);
        const subcategory = await appSubcategoriesOneGet(
            product.subcategoriesId
        );

        return Object.assign(product, {
            category: category.title,
            subcategory: subcategory.title,
        });
    };

    const reviews = async () => {
        const { reviewsData, totalReviews } = await appReviewsProductGet(
            props.params.slug
        );
        const customers = await appCustomersGet(urlSearchParams);
        const customersId = reviewsData
            .map((review) => review.customersId)
            .join(",");
        urlSearchParams.set("id", customersId);

        const reviews: ReviewItem[] = reviewsData.map((review) => {
            const index = customers.findIndex((customer) => {
                return review.customersId === customer.id;
            });
            const newReview = { ...review };
            if (index !== -1) {
                newReview.customerName = `${customers[index].firstName} ${customers[index].lastName}`;
            }

            return newReview;
        });

        return { reviewsArray: reviews, totalReviews };
    };

    return (
        <div className='wrapper'>
            <Product
                productData={await productData()}
                reviewsData={await reviews()}
            />

            {/* {product ? (
				<>
					<ProductLoop
						productData={product}
						reviewsArray={newReviews}
						totalReviews={totalReviews}
					/>
					<ProductTabs
						productData={product}
						reviewArray={newReviews}
						totalReviews={totalReviews}
					/>
				</>
			) : (
				<div>Product not Found</div>
			)} */}
        </div>
    );
}
