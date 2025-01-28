export interface AddressesModel {
	id: number;
	city: string;
	street: string;
	postalCode: number;
}

export class AddressesDTO {
	id;
	city;
	street;
	postalCode;
	constructor({ city, id, postalCode, street }: AddressesModel) {
		this.id = id;
		this.city = city;
		this.postalCode = postalCode;
		this.street = street;
	}
}
