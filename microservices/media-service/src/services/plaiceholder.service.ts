import { Injectable } from "@nestjs/common";
import { getPlaiceholder } from "plaiceholder";

@Injectable()
export class PlaiceholderService {
	async getPlaiceholder(src: string | URL) {
		const buffer = Buffer.from(src.toString());

		const {
			metadata: { height, width },
			...plaiceholder
		} = await getPlaiceholder(buffer, { size: 10 });

		return {
			...plaiceholder,
			img: {
				src,
				height,
				width,
			},
		};
	}
}
