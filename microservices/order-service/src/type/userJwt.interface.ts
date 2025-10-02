export interface IUserJwt {
	id: number;
	customerId: number;
	email: string;
	role: "admin" | "user";
}
