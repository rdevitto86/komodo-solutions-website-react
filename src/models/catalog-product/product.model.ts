import { isProduct, ProductJSON } from '../../npm/kfs-api/src/catalog-api/schemas/catalog-product';
import CatalogItem from '../catalog-items/catalog-item.model';
import { UserReview } from '../user-reviews/user-review.model';

/**
 * An orderable, catalog product
 * @extends {CatalogItem}
 */
export default class CatalogProduct extends CatalogItem {
    /**
     * Item SKU number
     */
    sku: string | null = null;

    /**
     * Item quantity
     */
    quantity: number | null = null;

    /**
     * Item stock level
     */
    stock: number | null = null;

    /**
     * Item key features
     */
    features: string | null = null;

    /**
     * Item technical specifications
     */
    specifications: null = null;

    /**
     * Enables user ratings
     */
    enableRatings: boolean = false;

    /**
     * Aggregated user rating
     */
    rating: number | null = null;

    /**
     * Enables user reviews
     */
    enableReviews: boolean = false;

    /**
     * User rating history
     */
    reviews: UserReview[] = [];

    /**
     * User's personal review
     */
    userReview: UserReview | null = null;

    /**
     * External link to support and documentation
     */
    documentsURL: string | null = null;

    /**
     * @param {CatalogProduct | ProductJSON} [props] product details
     */
    constructor(props?: CatalogProduct | ProductJSON) {
        super(props);

        if (isProduct(props)) {
            const {
                sku,
                quantity,
                stock,
                features,
                specifications,
                enableRatings,
                rating,
                enableReviews,
                reviews,
                userReview,
                documentsURL,
            } = props;

            // set product data
            this.sku = sku;

            if (quantity) {
                this.quantity = quantity;
            }
            if (stock) {
                this.stock = stock;
            }
            if (features) {
                this.features = features;
            }
            if (specifications) {
                this.specifications = specifications;
            }

            // set ratings data (if enabled)
            if (enableRatings === true) {
                this.enableRatings = true;

                if (typeof rating === 'number') {
                    this.rating = rating;
                }
            }

            // set review data (if enabled)
            if (enableReviews === true) {
                this.enableReviews = true;

                // set individual user-review
                if (userReview) {
                    this.userReview = new UserReview(userReview);
                }

                // iterate through reviews and populate history
                if (reviews instanceof Array && reviews.length) {
                    const reviewList = [];

                    // loop through reviews and map
                    for (const review of reviews) {
                        if (review) {
                            reviewList.push(new UserReview(review));
                        }
                    }
                    this.reviews = reviewList;
                }
            }

            // set support/documents url
            if (documentsURL) {
                this.documentsURL = documentsURL;
            }
        }
    }
}
