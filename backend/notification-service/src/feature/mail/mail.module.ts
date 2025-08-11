import { Module } from "@nestjs/common";
import { MailController } from "./mail.controller";
// import { MailService } from "./mail.service";
import { KafkaModule } from "../kafka/kafka.module";
import { MailService } from "./mail.service";

@Module({
	imports: [KafkaModule],
	controllers: [MailController],
	providers: [MailService],
})
export class MailModule {}
