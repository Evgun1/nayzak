import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AppService } from "../app.service";
import { ValidationLoginBodyDTO } from "src/validation/validationLogin.dto";
import { UserJwtDTO } from "src/dto/userJwt.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly appService: AppService) {
		super({ usernameField: "email" });
	}

	async validate(email: string, password: string): Promise<UserJwtDTO> {
		const credential = await this.appService.validateCredential({
			email,
			password,
		});

		if (!credential) {
			throw new UnauthorizedException();
		}

		return credential;
	}
}
