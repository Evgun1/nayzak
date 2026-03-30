import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import {
	GetCartAndAddressesRequest,
	GetCartAndAddressesResponse,
	UserGrpc,
} from "./type/userGrpc.type";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CatalogService, GetProductsRequest } from "./type/catalogGrpc.type";

@Injectable()
export class GrpcService implements OnModuleInit {
	private userGrpc: UserGrpc;
	private catalogGrpc: CatalogService;

	constructor(
		@Inject("USER_PACKAGE") private readonly userService: ClientGrpc,
		@Inject("CATALOG_PACKAGE") private readonly catalogService: ClientGrpc,
	) {}

	async onModuleInit() {
		this.userGrpc = this.userService.getService<UserGrpc>("UserService");

		this.catalogGrpc =
			this.catalogService.getService<CatalogService>("CatalogService");
	}

	async getCartsAndAddress(
		param: GetCartAndAddressesRequest,
	): Promise<GetCartAndAddressesResponse> {
		const result = await firstValueFrom(
			this.userGrpc.getCartsAndAddress({
				addressId: param.addressId,
				cartIds: param.cartIds,
			}),
		);
		return result;
	}

	async getProducts(data: GetProductsRequest) {
		const result = await firstValueFrom(this.catalogGrpc.getProducts(data));
		return result;
	}
}
