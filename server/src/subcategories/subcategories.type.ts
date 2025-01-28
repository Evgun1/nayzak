export interface SubcategoriesGetQuery {
	category?: string;
	subcategoriesId?: string;
}

export interface SubcategoryByCategoryGetParams {
	categoryName?: string;
}

export interface SubcategoriesGetParams {
	subcategoriesParam?: string | number;
}

export interface SubcategoriesGeDTO {
	title: string;
	categoriesId: string | number;
}
