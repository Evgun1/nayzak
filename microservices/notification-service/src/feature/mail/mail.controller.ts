import { Body, Controller, Inject, OnModuleDestroy } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { MailService } from "./mail.service";
import { SendActionLinkDTO } from "./dto/sendActionLink.dto";

@Controller("mail")
export class MailController {
	constructor(private readonly mailService: MailService) {}

	@MessagePattern("send-mail-action-link")
	async sendActionLink(@Body() body: SendActionLinkDTO) {
		await this.mailService.sendActionMail(body.email, body.activeLink);
	}
}
