import { Module } from "@nestjs/common";
import { ClientApiService } from "./clientApi.service";
import { HttpClientService } from "./httpClient.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot()],
	providers: [ClientApiService, HttpClientService],
	exports: [ClientApiService, HttpClientService],
})
export class ClientApiModule {}
