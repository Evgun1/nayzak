import { ProductItem } from "@/types/product.types";
import { ReviewItem } from "@/types/reviews.types";

export type ProductPreviewTypes = {
    className?: string;
    product: ProductItem;
    showIcon?: boolean;
    // reviewsArray: ReviewItem[];
    rating?: boolean;
    stylePrice?: string;
};
