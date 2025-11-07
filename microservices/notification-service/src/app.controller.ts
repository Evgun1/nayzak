import { Body, Controller, Get, Inject, OnModuleDestroy } from "@nestjs/common";
import { AppService } from "./app.service";
import { ClientKafka, MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
    
}
