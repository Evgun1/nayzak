export interface ISubcategory {
	id: number;
	title: string;
	categoriesId: number;
	Media: { src: string; name: string }[];
}
