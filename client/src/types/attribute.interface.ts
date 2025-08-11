export interface IAttribute {
	id: number;
	name: string;
	type: string;
	unit?: string;
	subcategoryId: number;
	active: boolean;
}

export type Attribute = {
	attribute: IAttribute[];
	countActiveAttributes: number;
};
