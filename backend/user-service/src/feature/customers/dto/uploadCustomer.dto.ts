import { number } from "zod";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { CustomerBaseDTO } from "./customerBase.dto";

export class UploadCustomerDTO {
	@IsNotEmpty({ message: "The field must not be empty" })
	@IsString()
	@Matches(/[A-Z]/, {
		message: "Display name must contain one capital letter",
	})
	@Matches(/^[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, {
		message: "Display name cannot contain symbols: .-!()_ at the beginning",
	})
	@Matches(/[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]$/, {
		message: "Display name cannot contain symbols: .-!()_ at the end",
	})
	@Matches(/^[^`!@#$%^&*()+=\[\]{};':"\\|,<>\/?~]+$/, {
		message: 'Should not have symbols: !@#$%^&*()+=[]{};":\\|,<>/?~',
	})
	firstName: string;

	@IsNotEmpty({ message: "The field must not be empty" })
	@IsString()
	@Matches(/[A-Z]/, {
		message: "Display name must contain one capital letter",
	})
	@Matches(/^[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, {
		message: "Display name cannot contain symbols: .-!()_ at the beginning",
	})
	@Matches(/[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]$/, {
		message: "Display name cannot contain symbols: .-!()_ at the end",
	})
	@Matches(/^[^`!@#$%^&*()+=\[\]{};':"\\|,<>\/?~]+$/, {
		message: 'Should not have symbols: !@#$%^&*()+=[]{};":\\|,<>/?~',
	})
	lastName: string;

	@IsNotEmpty()
	@IsNumber()
	credentialsId: number;
}
