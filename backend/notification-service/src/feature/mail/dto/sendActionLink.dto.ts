import { IsEmail, IsString } from "class-validator";
export class SendActionLinkDTO {
	@IsEmail()
	email: string;

	@IsString()
	activeLink: string;
}
