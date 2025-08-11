import { Injectable } from "@nestjs/common";
import { UploadAddressesDTO } from "../addresses/dto/uploadAddresses.dto";

@Injectable()
export class ReviewService {
	async uploadReview(body: UploadAddressesDTO) {}
}
