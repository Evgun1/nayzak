import { Context } from "hono";
import PersonalDataFormDTO from "./interfaces/PersonalDataForm";
import customersService from "./customers.service";
import getReqBody from "../tools/getReqBody";
import { QueryParameterTypes } from "../utils/service/service.type";
import clearCache from "../utils/clear-cache/ClearCache";

class CustomersController {
    async getAll(c: Context) {
        const queryParams = c.req.query() as QueryParameterTypes;

        const { totalCount, customers } =
            await customersService.getAll(queryParams);

        c.res.headers.append("X-Total-Count", totalCount.toString());
        return c.json(customers);
    }

    async getOne(c: Context) {
        const inputData = c.req.param() as { id: string };

        const customer = await customersService.getOne(inputData.id);
        return c.json(customer);
    }

    async create(c: Context) {
        const inputData = await getReqBody<PersonalDataFormDTO>(c);

        if (!inputData) return;

        const customer = await customersService.create(inputData);

        return c.json(customer);
    }

    async change(c: Context) {
        const inputData = await getReqBody<PersonalDataFormDTO>(c);
        if (!inputData) return;

        await clearCache("customers");
        const customer = await customersService.change(inputData);
        return c.json(customer);
    }

    async init(c: Context) {
        const token = c.req.header("authorization");
        if (!token) return;

        const customer = await customersService.init(token);

        return c.json(customer);
    }

    async delete(c: Context) {
        const customerId = (await getReqBody(c)) as number | number[];

        const id = await customersService.delete(customerId);
        if (!id) return;

        return c.json(id);
    }
}

export default new CustomersController();
