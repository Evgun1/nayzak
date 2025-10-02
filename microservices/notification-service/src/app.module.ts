import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./feature/kafka/kafka.module";
import { MailModule } from "./feature/mail/mail.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot({ envFilePath: ".env.local", isGlobal:true }), MailModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
