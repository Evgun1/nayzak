import { decode, sign } from "jsonwebtoken";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { object } from "zod";

const jwtSign = (data: Record<string, any>) => {
	const jwtSecretKey = process.env.JWT_SECRET_KEY;

	if (!jwtSecretKey || typeof jwtSecretKey !== "string") {
		throw new Error(
			"JWT_SECRET_KEY is not defined in environment variables",
		);
	}

	const res = sign(data, jwtSecretKey);
	return res;
};

const jwtDecode = <T>(token: string) => {
	const res = decode(token) as T;
	return res;
};

export { jwtSign, jwtDecode };
