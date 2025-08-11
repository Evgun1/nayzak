export interface CustomerItem {
	id: number;
	firstName: string;
	lastName: string;
	phone: number;
	credentialsId: number;
}

export interface CustomerPost {
	firstName: string;
	lastName: string;
	phone: number;
}

export interface CustomerPut extends CustomerPost {}
