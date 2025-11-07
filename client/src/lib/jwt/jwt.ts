import { decode, sign } from "jsonwebtoken";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { object } from "zod";

const jwtSign = (data: Record<string, any>) => {
	// const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
	const secretKey = process.env.JWT_SECRET_KEY;
	if (!secretKey) {
		throw new Error(
			"NEXT_PUBLIC_JWT_SECRET_KEY is not defined in environment variables",
		);
	}

	const res = sign(data, secretKey);
	return res;
};

const jwtDecode = <T>(token: string) => {
	const res = decode(token) as T;
	return res;
};

export { jwtSign, jwtDecode };
