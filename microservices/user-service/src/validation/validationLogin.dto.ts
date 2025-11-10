import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ValidationLoginBodyDTO {
	@IsEmail({}, { message: "Invalid email format" })
	email: string;

	@IsNotEmpty({ message: "The field must not be empty" })
	password: string;
}
