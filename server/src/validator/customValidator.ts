import { Context, Next } from "hono";
import schemaValidationHandler from "./schemaValidationHandler";
import getReqBody from "../tools/getReqBody";

function customValidator(
    target: "body" | "query" | "param",
    schema: Map<string, any>
): (c: Context) => Promise<any>;

function customValidator(
    target: "header",
    schema: Map<string, any>,
    headerName: "authorization"
): (c: Context, next: Next) => Promise<any>;

function customValidator(
    target: "body" | "query" | "param" | "header",
    schema: Map<string, any>,
    headerName?: "authorization"
) {
    return async (c: Context, next: Next) => {
        const targetTypeStrategy = new Map()
            .set("query", c.req.query)
            .set("param", c.req.param)
            .set("header", c.req.header)
            .set("body", getReqBody);

        for (const [key, value] of targetTypeStrategy.entries()) {
            if (target.includes(key)) {
                switch (key) {
                    case "body": {
                        const data = await getReqBody(c);
                        if (data) await schemaValidationHandler(data, schema);

                        break;
                    }
                    case "header": {
                        const data = value.bind(c.req)(headerName);
                        await schemaValidationHandler(data, schema);
                        break;
                    }
                    default: {
                        const data = value.bind(c.req)();
                        await schemaValidationHandler(data, schema);
                    }
                }
            }
        }
        await next();
    };
}

export default customValidator;
