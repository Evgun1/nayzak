export interface QueryParameterTypes {
	// page?: string;
	filter?: string;
	limit?: string;
	offset?: string;
	sort?: "asc" | "desc";
	sortBy?: string;
	search?: string;
	[key: string]: string | undefined;
}

export interface SortTypes {
	sort?: "asc" | "desc";
	sortBy?: string;
}

export interface LimitType {
	limit?: string;
}

export interface OffsetType {
	offset?: string;
}

export interface FilterType {
	search: string;
	[key: string]: string;
}
