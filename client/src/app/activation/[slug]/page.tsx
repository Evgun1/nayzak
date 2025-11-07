"use server";

import { appCredentialsActivationGet } from "@/lib/api/credentials";
import { cookies } from "next/headers";
import { FunctionComponent } from "react";

interface PageProps {
	params: { slug: string };
}

const Page: FunctionComponent<PageProps> = async (props) => {
	let message: string;

	try {
		await appCredentialsActivationGet(props.params.slug);
		message = "Activation was successful. You can close this page.";
	} catch (error) {
		const err = error as Error;

		const obj = JSON.parse(err.message) as {
			statusCode: number;
			message: string;
		};
		message = obj.message;
	}

	return <div>{message}</div>;
};

export default Page;
