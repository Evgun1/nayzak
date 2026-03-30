import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { PrismaService } from "src/prisma/prisma.service";
import {
	GetCategoriesMediaAllRequest,
	GetCategoriesMediaOneRequest,
	GetCustomersMediaAllRequest,
	GetCustomersMediaOneRequest,
	GetProductsMediaAllRequest,
	GetProductsMediaOneRequest,
	GetSubcategoriesMediaAllRequest,
	GetSubcategoriesMediaOneRequest,
	MediaGrpc,
} from "../types/media.grpc";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GrpcMediaService implements OnModuleInit {
	private grpcMedia: MediaGrpc;

	constructor(@Inject("MEDIA_PACKAGE") private client: ClientGrpc) {}

	onModuleInit() {
		return (this.grpcMedia =
			this.client.getService<MediaGrpc>("MediaService"));
	}

	async getCategoriesMediaAll(data: GetCategoriesMediaAllRequest) {
		return await firstValueFrom(this.grpcMedia.getCategoriesMediaAll(data));
	}
	async getCategoriesMediaOne(data: GetCategoriesMediaOneRequest) {
		return await firstValueFrom(this.grpcMedia.getCategoriesMediaOne(data));
	}

	async getSubcategoriesMediaAll(data: GetSubcategoriesMediaAllRequest) {
		return await firstValueFrom(
			this.grpcMedia.getSubcategoriesMediaAll(data),
		);
	}
	async getSubcategoriesMediaOne(data: GetSubcategoriesMediaOneRequest) {
		return await firstValueFrom(
			this.grpcMedia.getSubcategoriesMediaOne(data),
		);
	}

	async getProductsMediaAll(data: GetProductsMediaAllRequest) {
		return await firstValueFrom(this.grpcMedia.getProductsMediaAll(data));
	}
	async getProductsMediaOne(data: GetProductsMediaOneRequest) {
		return await firstValueFrom(this.grpcMedia.getProductsMediaOne(data));
	}

	async getCustomersMediaAll(data: GetCustomersMediaAllRequest) {
		return await firstValueFrom(this.grpcMedia.getCustomersMediaAll(data));
	}
	async getCustomersMediaOne(data: GetCustomersMediaOneRequest) {
		return await firstValueFrom(this.grpcMedia.getCustomersMediaOne(data));
	}
}
