import { Observable } from "rxjs";

type GetCustomersRequest = {
	customerIds: number[];
};

type GetCustomersResponse = {
	customerId: number;
	firstName: string;
	lastName: string;
}[];

export interface UserServices {
	getCustomers(data: GetCustomersRequest): Observable<GetCustomersResponse>;
}
