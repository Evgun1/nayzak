import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {} from "src/dto/userJwt.dto";
import { IUserJwt } from "src/interface/credentialsJwt.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET_KEY as string,
			ignoreExpiration: false,
		});
	}

	async validate(user: IUserJwt) {
		const { email, id, role, customerId } = user;

		return { id, customerId, email, role };
	}
}
