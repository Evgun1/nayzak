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

export type ModelMap = {
	Categories: Categories;
	Media: Media;
	Products: Products & { Media?: Media[]; ProductsRating?: ProductsRating };
	Subcategories: Subcategories;
	AttributeDefinitions: AttributeDefinitions;
	ProductsAttribute: ProductsAttribute;
	ProductsRating: ProductsRating;
};

export const Enums = {
	Products: Prisma.ProductsScalarFieldEnum,
	ProductsRating: Prisma.ProductsRatingScalarFieldEnum,
	Categories: Prisma.CategoriesScalarFieldEnum,
	Subcategories: Prisma.SubcategoriesScalarFieldEnum,
	Media: Prisma.MediaScalarFieldEnum,
	AttributeDefinitions: Prisma.AttributeDefinitionsScalarFieldEnum,
	ProductsAttribute: Prisma.ProductsAttributeScalarFieldEnum,
};
