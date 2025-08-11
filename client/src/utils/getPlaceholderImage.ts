"use server";


import sharp from "sharp";

function bufferToBase64(buffer: Buffer): string {
	return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function getBuffer(url: string | URL) {
	const res = await fetch(url, { cache: "no-cache" });
	return Buffer.from(await res.arrayBuffer());
}

export async function getPlaceholderImage(imageUrl: string) {
	try {
		const url = new URL(
			`http://localhost:2999/_next/image?url=${encodeURIComponent(
				imageUrl,
			)}&w=48&q=50`,
		);

		// const lowResImage = await getBuffer(
		// 	`${process.env.NEXT_URL}_next/image?url=${encodeURIComponent(
		// 		imageUrl,
		// 	)}&w=48&q=50`,
		// );
		const lowResImage = await getBuffer(url);

		const resizeBuffer = await sharp(lowResImage).resize(20).toBuffer();
		return { placeholder: bufferToBase64(resizeBuffer) };
	} catch (error) {
		return {
			placeholder:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==",
		};
	}
}
