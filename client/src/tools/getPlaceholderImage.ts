"use server";

import sharp from "sharp";

function bufferToBase64(buffer: Buffer): string {
	return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function getBuffer(url: string | URL) {
	try {
		const res = await fetch(url, { cache: "no-cache" });
		return Buffer.from(await res.arrayBuffer());
	} catch (error) {
		throw new Error("Invalid fetch");
	}
}

export async function getPlaceholderImage(imageUrl: string) {
	try {
		const lowResImage = await getBuffer(imageUrl);

		const resizeBuffer = await sharp(lowResImage).resize(20).toBuffer();
		return { placeholder: bufferToBase64(resizeBuffer) };
	} catch (error) {
		return {
			placeholder:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==",
		};
	}
}
