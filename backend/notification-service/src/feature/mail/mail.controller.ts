import { Body, Controller, Inject, OnModuleDestroy } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { MailService } from "./mail.service";
import { SendActionLinkDTO } from "./dto/sendActionLink.dto";

@Controller("mail")
export class MailController implements OnModuleDestroy {
	constructor(
		private readonly mailService: MailService,
		@Inject("MAIL_NOTIFICATION_SERVICE")
		private readonly mainKafkaClient: ClientKafka,
	) {}

	async onModuleDestroy() {
		await this.mainKafkaClient.connect();
	}

	@MessagePattern("send-mail-action-link")
	async sendActionLink(@Body() body: SendActionLinkDTO) {
		console.log(body);

		await this.mailService.sendActionMail(body.email, body.activeLink);
	}
}
