export class UserDTO {
	id: number;
	customerId: number;
	email: string;
	role: "admin" | "user";
}
