export interface CredentialsStateItem {
	id?: number;
	email: string;
	role?: string;
}

export interface CredentialsDTO extends CredentialsStateItem {
	password: string;
}

export interface CredentialsPasswordDTO {
	newPassword: string;
	oldPassword: string;
}
