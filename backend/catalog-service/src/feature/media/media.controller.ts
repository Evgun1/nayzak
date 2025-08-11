import { Controller, Post } from "@nestjs/common";

@Controller("media")
export class MediaController {
	@Post()
	async uploadMedia() {}
}
