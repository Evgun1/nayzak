import {
	AttributeDefinitions,
	Categories,
	Media,
	Prisma,
	Products,
	ProductsAttribute,
	ProductsRating,
	Subcategories,
} from "@prisma/client";

export type OrderByParam<T> = {
	[K in keyof T as T[K] extends Number ? K : never]?: "ASC" | "DESC";
};

export type ProductsOrderBy = OrderByParam<Products> & {
	Categories?: CategoriesOrderBy;
	Subcategories?: SubcategoriesOrderBy;
	Media?: MediaOrderBy;
	ProductsAttribute?: ProductsAttributeOrderBy;
	ProductsRating?: ProductsRatingOrderBy;
};

export type ProductsRatingOrderBy = OrderByParam<ProductsRating> & {
	Products?: ProductsOrderBy;
};

export type CategoriesOrderBy = OrderByParam<Categories> & {
	Products?: ProductsOrderBy;
	Subcategories?: SubcategoriesOrderBy;
	Media?: MediaOrderBy;
};

export type SubcategoriesOrderBy = OrderByParam<Subcategories> & {
	Products?: ProductsAttributeOrderBy;
	Categories?: CategoriesOrderBy;
	AttributeDefinitions?: AttributeDefinitions;
	Media?: MediaOrderBy;
};
export type MediaOrderBy = OrderByParam<Media> & {
	Products?: ProductsOrderBy;
	Categories?: CategoriesOrderBy;
	Subcategories?: SubcategoriesOrderBy;
};

export type ProductsAttributeOrderBy = OrderByParam<ProductsAttribute> & {
	AttributeDefinitions?: AttributeDefinitionsOrderBy;
	Products?: ProductsAttribute;
};

export type AttributeDefinitionsOrderBy = OrderByParam<AttributeDefinitions> & {
	AND?: AttributeDefinitionsOrderBy[];
	Subcategories?: SubcategoriesOrderBy;
	ProductAttribute?: ProductsAttributeOrderBy;
};

export type OrderBy = {
	Products: Partial<ProductsOrderBy>;
	Categories: Partial<CategoriesOrderBy>;
	Subcategories: Partial<SubcategoriesOrderBy>;
	Media: Partial<MediaOrderBy>;
	AttributeDefinitions: Partial<AttributeDefinitionsOrderBy>;
	ProductsAttribute: Partial<ProductsAttributeOrderBy>;
	ProductsRating: Partial<ProductsRatingOrderBy>;
};
