import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		console.log(process.env.JWT_SECRET_KEY);

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET_KEY as string,
			// secretOrKey: "JWT_SECRET_KEY" as string,
		});
	}

	async validate(payload: any) {
		return payload;
	}
}
