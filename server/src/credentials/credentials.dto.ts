import { th } from '@faker-js/faker';

interface UserModel {
	id: number;
	email: string;
	role: string;
	isActivated: boolean;
}

export class UserDto {
	id;
	email;
	role: string;
	isActivated;

	constructor(model: UserModel) {
		this.id = model.id;
		this.email = model.email;
		this.role = model.role;
		this.isActivated = model.isActivated;
	}
}
