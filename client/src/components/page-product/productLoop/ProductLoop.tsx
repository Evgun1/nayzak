import Rating from '@/components/elements/rating/Rating';
import Price from '@/components/elements/price/Price';
import ProductSlider from './ProductSlider';
import { ReviewItem } from '@/types/reviews.types';
import { ProductItem } from '../../../types/product.types';
import { TextClassList } from '../../../types/textClassList.enum';
import classes from './ProductLoop.module.scss';
import ProductActions from './ProductActions';
import Breadcrumbs, {
	BreadcrumbsPathItems,
} from '@/lib/ui/breadcrumbs/Breadcrumbs';
import { appCategoriesOneGet } from '@/utils/http/categories';
import { appSubcategoriesOneGet } from '@/utils/http/subcategories';

type ProductLoopProps = {
	productData: ProductItem;
	reviewsArray: ReviewItem[];
	totalReviews: number;
};

const ProductLoop = async ({
	productData,
	reviewsArray,
	totalReviews,
}: ProductLoopProps) => {
	return (
		<div className={classes.loop}>
			<div>
				<ProductSlider />
			</div>
			<div style={{ width: 456 }}>
				<div>
					<Breadcrumbs
						product={productData}
						style={{ justifyContent: 'flex-start', marginBottom: 8 }}
					/>
					<div className={classes.loop__header}>
						<div className={classes['loop__header-info']}>
							<h5>{productData.title}</h5>
							<p className={TextClassList.REGULAR_14}>
								{productData.description}
							</p>
							<div className={classes['loop__header-info_rating']}>
								<Rating rating={reviewsArray.map(({ rating }) => rating)} />
								<span className={TextClassList.REGULAR_12}>
									{totalReviews} Reviews
								</span>
							</div>
						</div>
						<div
							className={`${classes['loop__header-price']} ${TextClassList.SEMIBOLD_26}`}
						>
							<Price
								discount={productData.discount}
								mainPrice={productData.mainPrice}
								price={productData.price}
							/>
						</div>
					</div>
					<ProductActions productID={productData.id} />
				</div>
			</div>
		</div>
	);
};

export default ProductLoop;
