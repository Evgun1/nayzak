type AppColorGetProps = {
	hex?: string;
	rgb?: string;
};

const appColorGet = async (props: AppColorGetProps) => {
	try {
		let path = "https://www.thecolorapi.com/id";
		const urlSearchParams = new URLSearchParams();

		if (props.hex)
			urlSearchParams.set("hex", props.hex.replaceAll("#", ""));

		if (props.rgb) {
			const rgb = props.rgb
				.replaceAll("rgb", "")
				.replaceAll("(", "")
				.replaceAll(")", "")
				.replaceAll(", ", ",");

			urlSearchParams.set("rgb", rgb);
		}

		if (urlSearchParams.size >= 0) path += `?${urlSearchParams.toString()}`;

		const response = await fetch(path, {
			method: "GET",
		});

		return response.json();
	} catch (error) {
		console.log(error);
	}
};

export default appColorGet;
