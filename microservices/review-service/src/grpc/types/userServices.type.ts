import { Observable } from "rxjs";

type GetCustomersRequest = {
	customerIds: number[];
};

type GetCustomersItem = {
	customerId: number;
	firstName: string;
	lastName: string;
	image: Buffer;
};

type GetCustomersResponse = {
	customers: GetCustomersItem[];
};

export interface GrpcUserServices {
	getCustomers(data: GetCustomersRequest): Observable<GetCustomersResponse>;
}
