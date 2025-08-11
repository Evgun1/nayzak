import { loginAction } from "@/redux/store/auth/action";
export interface CredentialsStateItem {
	id?: number;
	email: string;
	role?: string;
}

export interface SignUp {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
export interface SignIn {
	email: string;
	password: string;
}

export interface CredentialsPasswordDTO {
	newPassword: string;
	oldPassword: string;
}
