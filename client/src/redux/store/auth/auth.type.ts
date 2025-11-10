import { loginAction } from "@/redux/store/auth/action";
export interface CredentialsStateItem {
	id?: number;
	email: string;
	role?: string;
}

export interface SignUpParam {
	// payload: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
export interface SignInParam {
	// payload: string;

	email: string;
	password: string;
}

export interface CredentialsPasswordParam {
	newPassword: string;
	oldPassword: string;
	confirmPassword: string;
}
