import prismaClient from "../prismaClient";
import { CartGetDTO } from "./interfaces/CartGetInput";
import { CartDTO, CartModel } from "./cart.dto";
import { MainService } from "../utils/service/main.service";
import { QueryParameterTypes } from "../utils/service/service.type";

class CartService {
    private mainService = new MainService();
    // private mainService = new MainService();
    // private queryParam = this.mainService.queryParams;

    async getAll(queryParam: QueryParameterTypes) {
        const cart = await prismaClient.cart.findMany({});
        const totalCount = await prismaClient.cart.count({});

        return { cart, totalCount };
    }

    async saveCart(inputData: CartGetDTO) {
        const { customerID, product } = inputData;

        const saveCart = await prismaClient.cart.create({
            data: {
                productsId: +product.productID,
                amount: +product.amount,
                customersId: customerID,
            },
        });

        const cartDTO = new CartDTO({
            amount: saveCart.amount,
            productID: saveCart.productsId,
            id: saveCart.id,
        });

        return cartDTO;
    }

    async updateCart({ product, customerID }: CartGetDTO) {
        const updateCart = await prismaClient.cart.update({
            where: {
                id: +product.id,
                productsId: +product.productID,
                customersId: customerID,
            },
            data: { amount: +product.amount },
        });

        return new CartDTO({
            id: updateCart.id,
            amount: updateCart.amount,
            productID: updateCart.productsId,
        });
    }

    async removeCart(id: number | number[]) {
        return await this.mainService.delete("Cart", id);
    }

    async init(customerID: number) {
        const cart = await prismaClient.cart.findMany({
            where: { customersId: customerID },
        });

        const cartDTO: CartModel[] = [];

        cart.map((product) =>
            cartDTO.push({
                id: product.id,
                amount: product.amount,
                productID: product.productsId,
            })
        );

        return cartDTO;
    }
}

export default new CartService();
